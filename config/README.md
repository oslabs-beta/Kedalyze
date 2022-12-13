# KEDA Auto-Scaling

<!--- TABLE OF CONTENTS --->
<details>
  <summary>Table Of Contents</summary>
  <ol>
    <li>
      <a href="#installation">Installing KEDA via Helm</a>
    </li>
      <li>
      <a href="#exposing">Expose KEDA Metrics</a>
    </li>
    <li>
    <a href="#metrics">Get Kube-State-Metrics</a>
    </li>
	    <li>
      <a href="#connecting">Connecting Prometheus with Grafana</a>
      </li>
	  <li><a href="#general-commands">General Commands</a></li>
  </ol>
</details>

# Installation

## Installing KEDA via Helm

1. Run these commands to deploy with [Helm](https://keda.sh/docs/2.8/deploy/)

   ```sh
   helm repo add kedacore https://kedacore.github.io/charts
   ```

   ```sh
   helm repo update
   ```

   ```sh
   helm show values kedacore/keda > keda-values.yaml
   ```

   ```sh
   kubectl create namespace keda
   ```

2. After seeing the keda-values.yaml make sure everything regarding prometheus to true in the keda-values.yaml file

   ```sh
   helm install keda kedacore/keda --namespace keda -f keda-values.yaml
   ```

   **Note:** Now the prometheus values should all be true for KEDA now

3. Download [Go](https://go.dev/doc/install) as an event trigger
4. Create another namespace:
   ```sh
   kubectl create namespace keda-demo
   ```
5. Go to [link](https://djamaile.dev/blog/using-keda-and-prometheus/) to start using KEDA and Prometheus to scale your Kubernetes workloads

6. Follow the sections _Starting Up_ to create your `prometheus.yaml` file

   **Note**: SKIP the _Creating the application(optional)_ section

7. Follow the section _Running the application_ and create a `go-deployment.yaml` file

8. Apply the manifest:
   ```sh
   kubectl apply -f go-deployment.yaml --namespace=keda-demo
   ```
9. Run this command to see all services:

   ```sh
   kubectl get services -A
   ```

10. Port-forward the image by running:

    ```sh
    kubectl port-forward svc/go-prom-app-service 8080 --namespace=keda-demo
    ```

    **Note:** Change the port if it is going to affect your other ports

11. Follow the section _Scaling the application_ and create a `scaled-object.yaml` file

    a) Make sure to change the service address to what your prometheus service address is

    - You can check this by going to prometheus's port: `localhost:9090 > Status > Command-Line Flags > --web.external-url`

    b) Change the query to what your prometheus can actually query

12. Apply the manifest:

    ```sh
    kubectl apply -f scaled-object.yaml --namespace=keda-demo
    ```

13. Check that you have HPA and scaled objects in your namespace:

    ```sh
    kubectl get hpa -n keda-demo
    ```

    There are two types of commands you can run to check for scaled objects:

    ```sh
    kubectl get scaledobject.keda.sh/prometheus-scaledobject -n keda-demo
    ```

    ```sh
    kubectl get scaledobjects -n keda-demo
    ```

14. Download hey from homebrew [link](https://github.com/rakyll/hey)

    ```sh
    brew install hey
    ```

    **Note:** hey is used for testing purposes: they send http requests to localhost:8080

    Run this command to create trigger events:

    ```sh
    hey -n 100 -m GET http://localhost:8080
    ```

15. To see the autoscaling in action:

    a) Run this command for Scaled Objects:

    ```sh
    kubectl describe so --namespace=keda-demo
    ```

    b) Run this command for HPA

    ```sh
    kubectl describe hpa -n keda-demo
    ```

    **Note:** may take a minute to show, these two commands will tell you if your HPA and scaled objects are working.

16. Now you have HPA and Scaled Objects working!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Exposing

## Exposing KEDA Metrics:

1. Run this command to check the pods in KEDA

   ```sh
   kubectl get pods -n keda
   ```

2. Port-forward your keda-metrics pod

   ```sh
   kubectl port-forward keda-operator-metrics-apiserver-95ccb594f-xr4lr 9022 -n keda
   ```

   **Note**: Your pod name may appear different, follow what shows up on your terminal

3. You can now see your KEDA metrics exposed at [localhost:9022/metrics](http://localhost:9022/metrics)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Metrics

## Getting Kube-State-Metrics:

1. Setup [Kube State Metrics](https://devopscube.com/setup-kube-state-metrics/)
2. Run the command
   ```sh
   git clone https://github.com/kubernetes/kube-state-metrics.git
   ```
3. Apply the files:
   ```sh
   kubectl apply -f kube-state-metrics/examples/standard/
   ```
4. Port-forward Kube-State-Metrics:

   ```sh
   kubectl port-forward svc/kube-state-metrics 30135:8081 -n kube-system
   ```

   **Note:** We are using port 8081 because our client is running on 8080

5. Create a **`Service`** and a **`ServiceMonitor`** to expose the `kube-state-metrics` on a port.

   This is an example of what it should look like:

   ```jsx
   apiVersion: v1
   kind: Service
   metadata:
     name: kube-state-metrics
     namespace: keda-demo
   spec:
     ports:
     - port: 8081
       targetPort: 8081
       protocol: TCP
     selector:
       app: kube-state-metrics
   ---
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: kube-state-metrics
     namespace: keda-demo
   spec:
     selector:
       matchLabels:
         app: kube-state-metrics
     namespaceSelector:
       any: true
     endpoints:
     - port: http
   ```

6. Apply the **`Service`** and **`ServiceMonitor`** by running the following command:

   ```sh
   kubectl apply -f <YAML-file-name>.yaml
   ```

   **Note:** Replace <YAML-file-name> with the YAML file you just created in step 5

7. Add both of these contents to your `prometheus.yaml` file:

   ```jsx
   containers:
   - name: prometheus
     image: prom/prometheus
     args:
       - '--config.file=/etc/prometheus/prometheus.yml'
       - '--storage.tsdb.path=/prometheus/'
       - '--web.external-url=http://prometheus-service.keda-demo.svc:9090'
   ```

   ```jsx
   - job_name: 'kube-state-metrics'
     static_configs:
     - targets: ['kube-state-metrics:8081']
   - job_name: 'keda-metrics'
     static_configs:
     - targets: ['keda-operator-metrics-apiserver.keda.svc.cluster.local:9022']
   ```

8. Update the clusterrole.rules.resources in `prometheus.yaml` to show services, nodes, nodes/metrics, endpoints, pods, and horizontalpodautoscalers and add apigroups with resources to the ConfigMaps

   ```jsx
   rules:
     - apiGroups: [""]
       resources:
         - services
         - nodes
         - nodes/proxy
         - nodes/metrics
         - endpoints
         - pods
         - horizontalpodautoscalers
       verbs: ["get", "list", "watch"]
     - apiGroups: [""]
       resources: ["configmaps"]
     - nonResourceURLs: ["/metrics"]
       verbs: ["get"]
   ```

9. Apply the prometheus.yaml file in keda-demo namespace
   ```sh
   kubectl apply -f prometheus.yaml -n keda-demo
   ```
   **Note:** The prometheus.yaml file should now be updated
10. Restart the prometheus deployment to update the changes
    ```sh
    kubectl rollout restart deployment/prometheus-deployment -n keda-demo
    ```
11. Get your current prometheus pod in the keda-demo namespace and delete it

    ```sh
    kubectl get pods -n keda-demo
    ```

    ```sh
    kubectl delete pod prometheus-pod-name -n keda-demo
    ```

    **Note:** A new prometheus pod should spin up automatically with all your changes

12. Port-forward Prometheus again and you should see two new jobs that are being scraped for kube-metrics under targets (`keda-metrics` and `kube-state-metrics`) in prometheus

    ```sh
    kubectl port-forward svc/prometheus-service 9090
    ```

    **Note:** Change the port if it is going to affect your other ports

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Connecting

## Prometheus with Grafana:

1. Set up [Grafana](https://devopscube.com/setup-grafana-kubernetes/)
2. Run the command
   ```sh
   git clone https://github.com/bibinwilson/kubernetes-grafana.git
   ```
3. Under the file `grafana-datasource-config.yaml`, change the data > prometheus.yaml > datasources > url to look something like this:

   ```jsx
   "url": "http://prometheus-service.monitoring.svc:9090",
   ```

4. Adjust the `service.yaml` file

   ```jsx
   apiVersion: v1
   kind: Service
   metadata:
     name: grafana
     namespace: keda-demo
   spec:
     selector:
       app: grafana
     ports:
       - port: 3030
         targetPort: 3030
   ```

5. Adjust the `grafana-datasource-config.yaml` to this:

   ```jsx
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: grafana-datasources
     namespace: keda-demo
   data:
     prometheus.yaml: |-
       {
           "apiVersion": 1,
           "datasources": [
               {
                 "access":"proxy",
                   "editable": true,
                   "name": "prometheus",
                   "orgId": 1,
                   "type": "prometheus",
                   "url": "http://prometheus-service.monitoring.svc:9090",
                   "version": 1
               }
           ]
       }
   ```

   **Note**: Change the namespace under every file from monitoring to keda-demo

6. Create the files under your terminal once changes are made by running these commands:

   ```sh
   kubectl create -f kubernetes-grafana/grafana-datasource-config.yaml
   ```

   ```sh
   kubectl create -f kubernetes-grafana/deployment.yaml
   ```

   ```sh
   kubectl create -f kubernetes-grafana/service.yaml
   ```

7. Get all the pod names in keda-demo namespace

   ```sh
   kubectl get pods -n keda-demo
   ```

8. Port-forward it to 3000

   ```sh
   kubectl -n keda-demo port-forward pod/grafana-5469c64c7d-7msgr 3000
   ```

   **Note:** Change the port if it is going to affect your other ports

- Access the Grafana UI by going to [localhost:3000](http://localhost:3000)
  - The login credentials are
    - Username: admin
    - Password: admin

9. Make changes to your prometheus.yaml file for `Service`

   ```jsx
   apiVersion: v1
   kind: Service
   metadata:
     name: prometheus-service
     annotations:
         prometheus.io/scrape: 'true'
         prometheus.io/port: '9090'
   spec:
     ports:
       - port: 9090
         targetPort: 9090
         nodePort: 30000
         protocol: TCP
     selector:
       app: prometheus-server
     type: NodePort
   ```

10. Apply the file again to prometheus in keda-demo namespace

    ```sh
    kubectl apply -f prometheus.yaml -n keda-demo
    ```

    prometheus.yaml should be updated now

11. Restart the prometheus deployment and grafana deployment to update the changes

    ```sh
    kubectl rollout restart deployment/prometheus-deployment -n keda-demo
    ```

    ```sh
    kubectl rollout restart deployment/grafana -n keda-demo
    ```

12. Get your current prometheus pod again

    ```sh
    kubectl get pods -n keda-demo
    ```

13. Delete the prometheus pod again
    ```sh
    kubectl delete pod prometheus-pod-name -n keda-demo
    ```

Once deleted, a new one should spin up automatically with all of your new changes

14. Get the name of the grafana pod to connect to Grafana UI

    ```sh
    kubectl get pods -A
    ```

15. Port-forward the pod

    ```sh
    kubectl -n keda-demo port-forward pod/grafana-5469c64c7d-7msgr 3000
    ```

16. Once connected to the Grafana UI, go to settings > configuration > data sources > add > prometheus

- For the HTTP URL, put in http://prometheus-service.keda-demo.svc:9090

17. Prometheus metrics should now be accessible on Grafana
18. The two main metrics we are focused on seeing the autoscaling based on HTTP requests are:

- keda_metrics_adapter_scaler_metrics_value
- http_requests

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# General Commands:

Gets everything within keda namespace:

```sh
kubectl get all -n keda
```

Gets the APIService in all the namespaces:

```sh
kubectl get apiservice --all-namespaces
```

Gets all Scaled Objects:

```sh
kubectl get scaledobjects -A
```

Gets all HPA:

```sh
kubectl get hpa -A
```

If you already have helm KEDA installed:

```sh
helm upgrade --set promethus.metricServer.enabled=true --set prometheus.operator.enabled=true --set prometheusRules.enabled=true keda kedacore/keda --namespace keda
```
