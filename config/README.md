# KEDA Auto-Scaling

1. Download KEDA via helm: 
[https://keda.sh/docs/2.8/deploy/]
(https://keda.sh/docs/2.8/deploy/)
    1. `helm repo add kedacore [https://kedacore.github.io/charts](https://kedacore.github.io/charts)`
    2. `helm repo update`
    3. `kubectl create namespace keda
     helm install keda kedacore/keda --namespace keda`
1. After installing KEDA run `helm show values kedacore/keda > keda-values.yaml`
    1. Set everything regarding prometheus to true in the keda-values.yaml file
2. Uninstall KEDA: `helm uninstall keda -n keda`
3. Reinstall KEDA: `helm install keda kedacore/keda --namespace keda -f keda-values.yaml`
4. Download go: [https://go.dev/doc/install](https://go.dev/doc/install)
5. Create another namespace with `kubectl create namespace keda-demo`
6. Go to this website: [https://djamaile.dev/blog/using-keda-and-prometheus/](https://djamaile.dev/blog/using-keda-and-prometheus/)
    1. follow the starting up steps to initiate a prometheus yaml!!!
    2. Go to the “Running the application section” and create a `go-deployment.yaml` file
    3. Apply the manifest: `kubectl apply -f go-deployment.yaml --namespace=keda-demo`
    4. Run `kubectl get services -A` to see all the services
    5. Port fowarding the image: run `kubectl port-forward svc/go-prom-app-service 8080 --namespace=keda-demo`
    6. Create a `scaled-object.yaml` file
        1. Change the service address to what your prometheus service address is (you can check on localhost:9090, prometheus’s external web URL)
        2. Change the query to what your prometheus can actually query
    7. Apply the manifest: `kubectl apply -f scaled-object.yaml --namespace=keda-demo`
    8. Check that you have HPA in your namespace: `kubectl get hpa -n keda-demo`
    9. Check that you have scaled objects in your namespace: `kubectl get scaledobject.keda.sh/prometheus-scaledobject -n keda-demo` or `kubectl get scaledobjects -n keda-demo`
7. download hey from homebrew
    1. Docs: [https://github.com/rakyll/hey](https://github.com/rakyll/hey)
    
    ```jsx
    brew install hey
    ```
    
8. hey is used for testing purposes: they send http requests to localhost:8080

```jsx
hey -n 100 -m GET [http://localhost:8080](http://localhost:8080/)
```

1. To see the autoscaling in action:
    1. Scaled Objects: Run `kubectl describe so --namespace=keda-demo` (may take a minute to show)
        
        ![Screenshot 2022-12-04 at 12.17.47 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d9fc57b2-6993-4ed2-94cb-34c424e9f66e/Screenshot_2022-12-04_at_12.17.47_AM.png)
        
    2. HPA: Run `kubectl describe hpa -n keda-demo`
        
        ![Screenshot 2022-12-04 at 12.18.12 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e44af645-ece6-462e-81ae-7afcc622419d/Screenshot_2022-12-04_at_12.18.12_AM.png)
        
    3. This will tell you if your HPA and scaled objects are working

** Note: Initially tried to do this, but it **DIDN’T** work, the file was still set to false, so had to just edit it from the file itself and then apply it

![Screenshot 2022-12-04 at 12.21.31 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f9cce5c3-c5e5-4f98-8e0c-7e27bfd82bd4/Screenshot_2022-12-04_at_12.21.31_AM.png)

Ex: `scaled-object.yaml` file

![Screenshot 2022-12-04 at 1.09.21 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42caea72-5097-46ea-8bb3-50794ad8c492/Screenshot_2022-12-04_at_1.09.21_AM.png)

![Screenshot 2022-12-04 at 12.13.50 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2dafe0b1-85db-4626-b6b0-6c7516976146/Screenshot_2022-12-04_at_12.13.50_AM.png)

For more info: follow this video starting at 6:48 mark [https://www.youtube.com/watch?v=3lcaawKAv6s&ab_channel=DevOpsToolkit](https://www.youtube.com/watch?v=3lcaawKAv6s&ab_channel=DevOpsToolkit)

After running the script.js command, should see something like this:

![Screenshot 2022-12-04 at 12.16.28 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1bde6b7-057c-4816-b67d-7eba6ef06e19/Screenshot_2022-12-04_at_12.16.28_AM.png)

# Expose KEDA Metrics:

1. Get keda pods: run `kubectl get pods -n keda`
2. Run `kubectl port-forward keda-operator-metrics-apiserver-95ccb594f-xr4lr 9022 -n keda`
    1. Replace `95ccb594f-xr4lr` with your api server #
    2. can get this by command `kubectl get svc -A`
3. Go to [http://localhost:9022/metrics](http://localhost:9022/metrics) and you should see the keda metrics page

# Get ****Kube-State-Metrics****:

1. docs: [https://devopscube.com/setup-kube-state-metrics/](https://devopscube.com/setup-kube-state-metrics/)
2. git clone [https://github.com/kubernetes/kube-state-metrics.git](https://github.com/kubernetes/kube-state-metrics.git)
3. `kubectl apply -f kube-state-metrics/examples/standard/`
4. `kubectl port-forward svc/kube-state-metrics 30135:8081 -n kube-system` 
    1. use port 8081 because we are using port 8080 for our demo app
5. Create a **`Service`**and a **`ServiceMonitor`** that will expose the **`kube-state-metrics`** metrics on a port.

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

1. Apply the **`Service`** and **`ServiceMonitor`** by running the following command:
    1. `kubectl apply -f <YAML-file-name>.yaml`    —> (replace <YAML-file-name> with the yaml file you created in step 5
2. add both of these to your prometheus yaml file
    
    ![Screen Shot 2022-12-09 at 5.50.51 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8b14ee76-137f-477c-aa84-509e39f62c68/Screen_Shot_2022-12-09_at_5.50.51_PM.png)
    

```jsx
- job_name: 'kube-state-metrics'
  static_configs:
  - targets: ['kube-state-metrics:8081']
- job_name: 'keda-metrics'
  static_configs:
  - targets: ['keda-operator-metrics-apiserver.keda.svc.cluster.local:9022']
```

1. update the clusterrole.rules.resources in prometheus yaml to show services, nodes, nodes/metrics, endpoints, pods, and horizontalpodautoscalers & add apigroups with resources: configmaps (not sure if this is necessary)

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

1. apply to prometheus in keda-demo namespace
    1. `kubectl apply -f prometheus.yaml -n keda-demo`
    2. prometheus should be updated
2. restart the prometheus deployment to update the changes
    1. `kubectl rollout restart deployment/prometheus-deployment -n keda-demo`
3. delete your current prometheus pod
    1. get the pods with the command `kubectl get pods -n keda-demo`
    2. a new one should spin up automatically with all your changes
4. port forward prometheus again
    1. `kubectl port-forward svc/prometheus-service 9090`
    2. you’ll see that 2 new jobs are being scraped kubemetrics under targets
        
        ![Screen Shot 2022-12-08 at 9.02.00 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ef2cf251-3dd7-4500-9da0-b4dec04abdbc/Screen_Shot_2022-12-08_at_9.02.00_PM.png)
        

# Add Grafana:

- use this guide: [https://devopscube.com/setup-grafana-kubernetes/](https://devopscube.com/setup-grafana-kubernetes/)
- once cloned, under the file grafana-datasource-config.yaml, change the property data.prometheus.yaml.url!!!!

```jsx
"url": "http://prometheus-service.monitoring.svc:9090",
```

adjust the service.yaml file

![Screen Shot 2022-12-09 at 5.51.53 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe02cffc-c1d0-44c5-97de-c799a91860d3/Screen_Shot_2022-12-09_at_5.51.53_PM.png)

- adjust the grafana-datasource-config.yaml to this

![Screen Shot 2022-12-09 at 5.52.23 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e6dedfe0-6fd1-42bb-8ce4-52653516c307/Screen_Shot_2022-12-09_at_5.52.23_PM.png)

- **change namespace under every file from monitoring to keda-demo!!!**
- create the files under your terminal once changes are made
    - `kubectl create -f kubernetes-grafana/grafana-datasource-config.yaml`
    - `kubectl create -f kubernetes-grafana/deployment.yaml`
    - `kubectl create -f kubernetes-grafana/service.yaml`
- kubectl get all -A to get the name of the grafana pod and port forward it to 3000
    - `kubectl -n keda-demo port-forward pod/grafana-5469c64c7d-7msgr 3000`
- go on [localhost:3000](http://localhost:3000)
    - username & password are both admin
    - will give you an option to change it, optional
- Prometheus.yaml change it up!!!
    
    ![Screen Shot 2022-12-09 at 12.55.20 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a2ec648-0763-466f-b6bb-34dd8d45b54e/Screen_Shot_2022-12-09_at_12.55.20_PM.png)
    
- apply the file again to prometheus in keda-demo namespace
    - `kubectl apply -f prometheus.yaml -n keda-demo`
    - prometheus should be updated
- restart the prometheus deployment and grafana deployment to update the changes
    - `kubectl rollout restart deployment/prometheus-deployment -n keda-demo`
    - `kubectl rollout restart deployment/grafana -n keda-demo`
- delete your current prometheus pod
    - can get the pods with the command `kubectl get pods -n keda-demo`
    - once deleted, a new one should spin up automatically with all your changes
- kubectl get all -A to get the name of the grafana pod and port forward it to 3000
    - `kubectl -n keda-demo port-forward pod/grafana-5469c64c7d-7msgr 3000`
- once logged in to grafana go to settings > configuration > data sources > add > prometheus
- configure this way
    
    ![Screen Shot 2022-12-09 at 5.39.58 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6d1d41e4-29f0-4a63-95ec-b0e5badadc6d/Screen_Shot_2022-12-09_at_5.39.58_PM.png)
    
- prometheus metrics should now be accessible on grafana
- the 2 main metrics we focus on to see the autoscaling based on http requests are:
    - keda_metrics_adapter_scaler_metrics_value
    - http_requests
        
        ![Screen_Shot_2022-12-09_at_4.21.29_PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e29eb85e-583e-4c78-88c5-e13aa11c4a63/Screen_Shot_2022-12-09_at_4.21.29_PM.png)
        

# General Commands:

- Checks everything within keda namespace: `kubectl get all -n keda`
- `kubectl get apiservice --all-namespaces`
- `kubectl get scaledobjects -A`
- `helm upgrade --set promethus.metricServer.enabled=true --set prometheus.operator.enabled=true --set prometheusRules.enabled=true keda kedacore/keda --namespace keda` (if you already have helm keda installed)