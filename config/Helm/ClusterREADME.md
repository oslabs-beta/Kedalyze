# Cluster Setup (via Helm)

## MacOS Installation

1.  Add and then install the helm repo: [link](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

    ```sh
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo update
    ```

    ```sh
    helm install [RELEASE_NAME] prometheus-community/kube-prometheus-stack
    ```

    **Note**: Our release name was `prometheus`

2.  Run

    ```sh
    kubectl get statefulset
    ```

    You should see 2 stateful set's:
    `alertmanager-prometheus-kube-prometheus-alertmanager` and `prometheus-prometheus-kube-prometheus-prometheus`

3.  Run these commands to see your stateful set YAML files:

    ```sh
    kubectl describe statefulset prometheus-prometheus-kube-prometheus-prometheus > prom.yaml
    ```

    ```sh
    kubectl describe statefulset alertmanager-prometheus-kube-prometheus-alertmanager > alert.yaml
    ```

4.  Run this command to see your deployment:

    ```sh
    kubectl get deployment
    ```

    You should see this deployment: `prometheus-kube-prometheus-operator`

5.  Run this command to see your deployment YAML file:

    ```sh
    kubectl describe deployment prometheus-kube-prometheus-operator > oper.yaml
    ```

6.  Run this command to see your secret:

    ```sh
    kubectl get secret
    ```

    You should see this secret: `prometheus-prometheus-kube-prometheus-prometheus`

7.  Run this command to see your secret YAML file:

    ```sh
    kubectl get secret prometheus-prometheus-kube-prometheus-prometheus -o yaml > secret.yaml
    ```

8.  Take a look at your prom.yaml file, locate where it shows the rules file mounted. It should look something like this: `prometheus-prometheus-kube-prometheus-prometheus-rulefiles-0`

9.  Run this command to see your configmap YAML file:

    ```sh
    kubectl get configmap prometheus-prometheus-kube-prometheus-prometheus-rulefiles-0 -o yaml > config.yaml
    ```

10. Run this command to see your pods:

    ```sh
    kubectl get pods
    ```

    You should see a prometheus-grafana pod like this: `prometheus-grafana-55985c774b-pjqlf`

    **Note**: Your pod name may appear different, follow what shows up on your terminal

11. Run this command to connect your pod to grafana

    ```sh
    kubectl logs prometheus-grafana-55985c774b-pjqlf -c grafana
    ```

12. Run this command to access Grafana UI

    ```sh
    kubectl port-forward deployment/prometheus-grafana 3001:3000
    ```

    **Note**: This is port forwarded to localhost:3001 with a target port of 3000 because Grafana runs on port 3000, but our server is running on 3000 as well.

13. Go to localhost:3001 now, the Grafana UI should appear. The login credentials are

    ```sh
    username: admin
    password: prom-operator
    ```

14. You should be able to see some metrics scraped by the node-exporter with some example dashboards

15. Run this command to see your services:

    ```sh
    kubectl get service
    ```

16. Access Prometheus UI by running the command:

    ```sh
    kubectl port-forward service/prometheus-kube-prometheus-prometheus 9090
    ```

17. Access Prometheus Alert UI by running this command:

    ```sh
    kubectl port-forward service/prometheus-kube-prometheus-alertmanager 9093
    ```

18. You can now create your own promQL queries and dashboards!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Grafana Embedding (via Helm)

## Accessing grafana.ini

1. In your Grafana UI, the allow_embedding is set to false. Follow these steps to enable it. To see these settings, they are located at the `Server Admin (lower left corner, shield logo) > settings > security, allow_embedding: false`

2. Run this command

   ```sh
   kubectl edit configmap -n default prometheus-grafana -o yaml
   ```

   **Note:** DO NOT CLOSE THE VIM EDITOR

   VIM Editor commands for reference: [link](https://sites.radford.edu/~mhtay/CPSC120/VIM_Editor_Commands.htm)

3. When the VIM editor opens, you should see a file location on the bottom, it would look something like this:
   `"/var/folders/7c/155484h133q1wyl5012jvvnm0000gn/T/kubectl-edit-1574205893.yaml" 40L, 1119B`

4. Navigate to that location on your computer, make sure you have enabled viewing hidden files on your Mac with this command:

   ```sh
   command + shift + .
   ```

5. You would navigate from `Macintosh HD > var > folders > 7c > 155484h133q1wyl5012jvvnm0000gn > T > kubectl-edit-1574205893.yaml`, double click on it and it should open in your VSCode

6. Edit the YAML file in VSCode and add this below domain:

   ```sh
   [security]
   allow_embedding: true
   [auth.anonymous]
   enabled: true
   ```

   Save this file and keep it open for now

7. Go back to the VIM editor, it should show a command saying (O)K or (L)oad File. Press `L` for Load File and then enter `:wq`. This should save the changes that you have currently made.

8. Notice at the top of the Grafana UI server admin settings it says `"These system settings are defined in grafana.ini or custom.ini (or overridden in ENV variables). To change these you currently need to restart Grafana."`

9. Run this command to get all pods

   ```sh
   kubectl get po -A
   ```

10. Run this command to delete your current prometheus-grafana pod:

    ```sh
    kubectl delete pod prometheus-grafana-55985c774b-pjqlf
    ```

    **Note:** Don't worry, this pod is going to regenerate

11. Run this command to get all pods again

    ```sh
    kubectl get po -A
    ```

12. Run this command to connect your new pod to grafana again:

    ```sh
    kubectl logs prometheus-grafana-6fdd6868b4-vc7rk -c grafana
    ```

13. Run this command to access Grafana UI

    ```sh
    kubectl port-forward deployment/prometheus-grafana 3001:3000
    ```

14. Now when you log back into the Grafana UI and go to `Server Admin (lower left corner, shield logo) > settings > security`, the allow_embedding should say `true`

15. To start embedding your own custom dashboard, click on the three dots on the top to share. You will see 4 options: Link, Snapshot, Embed, Library Panel. If you decide to use the `Embed` section with the iframe, replace the current src link with the link from the `Link` section or else you will get a 404 error

<p align="right">(<a href="#readme-top">back to top</a>)</p>
