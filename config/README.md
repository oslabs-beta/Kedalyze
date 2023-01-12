# KEDA Auto-Scaling

<!--- TABLE OF CONTENTS --->
<details>
  <summary>Table Of Contents</summary>
  <ol>
    <li>
      <a href="#installation">Installing KEDA via Helm</a>
    </li>
    <li>
      <a href="#prometheus-setup">Installing a Sample Application</a>
    </li>
    <li>
      <a href="#sample-app">Using a Sample Application (Optional)</a>
    </li>
    <li>
      <a href="#scaled-object">Creating a Scaled Object</a>
    </li>
    <li>
      <a href="#testing-load">Testing our KEDA Scaler</a>
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

1. Run these commands to deploy KEDA with [Helm](https://keda.sh/docs/2.8/deploy/)

   ```sh
   helm repo add kedacore https://kedacore.github.io/charts
   ```

   ```sh
   helm repo update
   ```

   ```sh
   kubectl create namespace keda
   ```

   ```sh
   helm install --set prometheus.metricServer.enabled=true --set prometheus.metricServer.podMonitor.enabled=true --set prometheus.operator.enabled=true --set prometheus.operator.podMonitor.enabled=true --set prometheus.operator.prometheusRules.enabled=true keda kedacore/keda --namespace keda
   ```

   ```sh
   helm show values kedacore/keda > keda-values.yaml
   ```

2. After seeing the keda-values.yaml, make sure everything regarding prometheus to true in the keda-values.yaml file

   **Note:** Now the prometheus values should all be true for KEDA now. If not, then please use the command

   ```sh
   helm upgrade --set prometheus.metricServer.enabled=true --set prometheus.metricServer.podMonitor.enabled=true --set prometheus.operator.enabled=true --set prometheus.operator.podMonitor.enabled=true --set prometheus.operator.prometheusRules.enabled=true keda kedacore/keda --namespace keda
   ```

<p align="right">(<a href="#installation">back to top</a>)</p>

# Prometheus-Setup

## Setting up Prometheus

**Note:** The following steps use a sample app for testing purposes. this is **optional** because you can use your own application as well

1. Download [Go](https://go.dev/doc/install)
2. Create another namespace:
   ```sh
   kubectl create namespace keda-demo
   ```
3. If you'd like to use our custom Prometheus manifest (recommended), it is listed under (config/Prometheus/prometheus.yaml) . If not, modify your existing prometheus yaml configurations to adhere to our customizations.

4. If using our prometheus.yaml manifest, make sure to apply it

   ```sh
   kubectl apply -f Kedalyze/config/Prometheus/prometheus.yaml
   ```

5. Once the pod is up and running, see if it works on port 9090
   ```sh
   kubectl -n keda-demo port-forward svc/prometheus-service 9090
   ```
   If using your own prometheus manifest, replace {prometheus-service} with your prometheus service name.

<p align="right">(<a href="#installation">back to top</a>)</p>

# Sample-App

## Using a Sample Application (Optional)

1. Use the manifest file under (config/SampleApplication/go-deployment.yaml) to create your application.
   **Note:** you can apply your own image as well
   Apply the manifest:

   ```sh
   kubectl apply -f Kedalyze/config/SampleApplication/go-deployment.yaml
   ```

2. Run this command to see all services:

   ```sh
   kubectl get services -A
   ```

3. Port-forward the image by running:

   ```sh
   kubectl port-forward svc/go-prom-app-service 8080 --namespace=keda-demo
   ```

   **Note:** Change the port if it is going to affect your other ports (8081:8080 or 8082:8080)

<p align="right">(<a href="#installation">back to top</a>)</p>

# Scaled-Object

## Creating a Scaled Object

1. Now that we have our application, we can create a scaled object! To use our custom yaml file (Recommended) locate it under (config/SampleApplication/scaled-object.yaml)

   a) Read the yaml manifest and it’s comments to understand what is going on. One important note as well is in advanced.horizontalPodAutoscalerConfig.scaleUp.policies you can see I have specified 50%, that means our pod will scale up with 50% of it’s current amount of pods. 1 -> 2 -> 3 -> 5 -> 8 -> 12 -> 18 -> 20 it will stop at 20 pods because that is the limit we specified.

   b) Make sure to change the service address to your prometheus service address

    - You can check this by going to prometheus's port: `localhost:9090 > Status > Command-Line Flags > --web.external-url`

   c) The query will be scaling the application up and down based on the amount of http requests coming into Prometheus

2. Apply the manifest:

   ```sh
   kubectl apply -f Kedalyze/config/SampleApplication/scaled-object.yaml --namespace=keda-demo
   ```

3. Check that you have HPA and scaled objects in your namespace:

   ```sh
   kubectl get hpa -n keda-demo
   ```

   ```sh
   kubectl get scaledobjects -n keda-demo
   ```

<p align="right">(<a href="#installation">back to top</a>)</p>

# Testing-Load

## Testing our KEDA Scaler

1. Download hey from homebrew [link](https://github.com/rakyll/hey)

   ```sh
   brew install hey
   ```

   **Note:** hey is used for testing purposes: they send http requests to localhost:8080

2. Run this command to create trigger events:

   ```sh
   hey -n 100 -m GET http://localhost:8080
   ```

3. To see the autoscaling in action:

   a) Run this command for Scaled Objects:

   ```sh
   kubectl describe so --namespace=keda-demo
   ```

   b) Run this command for HPA

   ```sh
   kubectl describe hpa -n keda-demo
   ```

   **Note:** may take a minute to show, these two commands will tell you if your HPA and scaled objects are working.

4. Now you have HPA and Scaled Objects working!

<p align="right">(<a href="#installation">back to top</a>)</p>

# Exposing

## Exposing KEDA Metrics:

1. Run this command to check the pods in KEDA

   ```sh
   kubectl get pods -n keda
   ```

2. Port-forward your keda-metrics pod

   ```sh
   kubectl port-forward {keda-operator-metrics-apiserver-pod#} 9022 -n keda
   ```

   **Note**: Replace {keda-operator-metrics-apiserver-pod#} with your actual pod name

3. You can now see your KEDA metrics exposed at [localhost:9022/metrics](http://localhost:9022/metrics)

<p align="right">(<a href="#installation">back to top</a>)</p>

# Metrics

## Getting Kube-State-Metrics:

Kube State metrics is a service that talks to the Kubernetes API server to get all the details about all the API objects like deployments, pods, daemonsets, Statefulsets, etc.

1. Setup [Kube State Metrics](https://devopscube.com/setup-kube-state-metrics/)
2. Run the command
   ```sh
   git clone https://github.com/kubernetes/kube-state-metrics-configs.git
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

5. Create a **`Service`** and a **`ServiceMonitor`** to expose the `kube-state-metrics` on a port. You can utilize our custom manifest on (config/KubeMetrics/kube-service.yaml)

6. Apply the **`Service`** and **`ServiceMonitor`** by running the following command:

   ```sh
   kubectl apply -f Kedalyze/config/KubeMetrics/kube-service.yaml
   ```

<p align="right">(<a href="#installation">back to top</a>)</p>

# Connecting

## Prometheus with Grafana:

1. To set up Grafana, use our manifest files under config/Grafana (Recommended) or adjust your own Grafana files to follow our configurations

2. Apply our configurations using these commands:

   ```sh
   kubectl apply -f Kedalyze/config/Grafana/grafana-datasource-config.yaml
   ```

   ```sh
   kubectl apply -f Kedalyze/config/Grafana/deployment.yaml
   ```

   ```sh
   kubectl apply -f Kedalyze/config/Grafana/service.yaml
   ```

3. Get all the pod names in keda-demo namespace

   ```sh
   kubectl get pods -n keda-demo
   ```

4. Port-forward the grafana service to 3001:3000

   ```sh
   kubectl -n keda-demo port-forward svc/grafana 3001:3000
   ```

   **Note:** Change the port if it is going to affect your other ports

- Access the Grafana UI by going to [localhost:3000](http://localhost:3000)
  - The login credentials are
    - Username: admin
    - Password: admin

5. Once connected to the Grafana UI, go to settings > configuration > data sources > add > prometheus

   - For the HTTP URL, put in http://prometheus-service.keda-demo.svc:9090

6. Prometheus metrics should now be accessible on Grafana
7. The two main metrics we are focused on seeing the autoscaling based on HTTP requests are:

   - keda_metrics_adapter_scaler_metrics_value
   - http_requests

<p align="right">(<a href="#installation">back to top</a>)</p>

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

<!-- I'm only doing this for daily commits -->