![KEDALyzeLogo](./src/client/styles/logo1.jpg?raw=true)

# KEDAlyze

An application that visualizes real-time Kubernetes Event Driven Autoscaling (KEDA).

<!--- TABLE OF CONTENTS --->
<details>
  <summary>Table Of Contents</summary>
  <ol>
    <li>
      <a href="#functionality">Functionality</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
      <li>
      <a href="#features">Features</a>
      <ul>
	  <li><a href="#live-metrics">Live Metrics</a></li>
	  <li><a href="#autoscaling">Auto Scaling</a></li>
      </ul>
    </li>
	    <li>
      <a href="#general-setup">General Setup</a>
      <ul>
	  <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#electron-setup">Electron Setup</a>
      <ul>
	  <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
	    <li>
      <a href="#cluster-setup">Cluster Setup</a>
      <ul>
	  <li><a href="#installation">MacOS Installation</a></li>
	  <li><a href="#installation">Windows Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>
  </ol>
</details>

# Functionality

KEDA is the perfect tool to use for autoscaling kubernetes pods based on event triggers. Gone are the days of only being able to horizontally autoscale new pods only for CPU or memory usage. We know how great of a tool KEDA is, but how can we see all of it's magic happening behind the scenes?

We introduce to you, KEDALyze!

KEDALyze is an open-source product that gives users the ability to visualize KEDA's autoscaling. With Prometheus as the event trigger, watch as promQL queries drive the deployment and termination of pods. Our visualizer displays cluster health, events triggers, and horizontal auto scaling in live time, to give the user security that their applications can handle higher workloads.

### Built With:

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
  ![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) <a href='https://github.com/shivamkapasia0' target="_blank"><img alt='Kubernetes' src='https://img.shields.io/badge/Kubernetes-100000?style=for-the-badge&logo=Kubernetes&logoColor=white&labelColor=000000&color=black'/></a>
  <a href='https://github.com/shivamkapasia0' target="_blank"><img alt='KEDA' src='https://img.shields.io/badge/KEDA-100000?style=for-the-badge&logo=KEDA&logoColor=white&labelColor=000000&color=2F61D3'/></a>
- ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white) ![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Features

## Live Metrics

## Autoscaling

Prometheus queries are the event triggers we used to horizontally auto scale our pods.
Customizing the KEDA scaled object to use http requests, we are able to deploy replica pods once the requests have reached a certain threshold.
We've incorporated Grafana to allow monitoring of the http requests of your application, alongside with the autoscaling that is triggered.
Our charts give users the security to know that KEDA is functional, deploying pods at higher workloads and disapating them when they are no longer necessary.

_insert youtube video here_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# General Setup

In the config folder, you can see all the configuration files needed to get you started with our application. Please have docker and minikube installed on your computer prior to following the steps in the read me in the config folder.

## Installation

1. Fork and clone the repo
   ```sh
   git clone https://github.com/your-github-handle/Kedalyze.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create `.env` file at root of directory

   ```sh
   root
    ├─ .env
    ├─ electron
    └─ src
   ```

4. Connect Mongo database in .env
   ```js
   MONGO_URI = 'YOUR MONGO URI STRING';
   ```
5. Set up JWT secret in `.env`
   ```js
   JWT_SECRET = 'your string of choice';
   ```
6. `npm run dev`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Electron Setup

## MacOS Setup for Electron

1.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Windows Setup for Electron

1. download and install all of these dependencies:

   ```sh
   sudo apt install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
   ```

2. Go to this [link](https://sourceforge.net/projects/vcxsrv/) to download X Server, this is how you will see the electron window:

3. Steps for X server configuration:

   - Under `display settings`, select `Multiple Windows`, set the Display number to `-1`, click **next**
   - Under `select how the client starts`, select `Start no client`, click **next**
   - Under `extra settings`, make sure to add a checkmark to disable access control, click **next**
   - Click `save configuration` and add the `config.xlaunch` to your desktop, click **finish**.

4. Next go to `Windows Security` > `Firewall & network protection` > `Allow an app through firewall` > Make sure **VcXsrv** has both public and private checked

5. Before attempting to npm run anything you will always need to go to your `config.xlaunch` file and run it first. All you have to do is double click the file and you will see the X server icon in your system tray or taskbar. That is how you know X server is running.

6. Run this command on your local system this will print your nameserver IP to the terminal:

   ```sh
   export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"
   ```

7. Copy the nameserver IP, you will need it for the next step

8. In the JSON file change the electron-windows script to export
   `DISPLAY="put your nameserver IP here"` do not add the quotes in your JSON file

9. `npm start (to start the webpack)`

10. `npm run electron-windows`

11. `npm run electron-start`

12. The electron application should now launch in an X server window

\*\* **Important**
If you get this error: `Missing X server or $DISPLAY
The platform failed to initialize. Exiting. `

1. Put this command in the terminal: `echo $DISPLAY `

2. If nothing prints to the terminal go to the next step, if a nameserver IP does print make sure it matches the `export DISPLAY=` in the electron-windows script

3. Repeat steps 8 and 9, make sure X server is still running, then move on to steps 10 to 12

\*\* **Important:**
Each and every time you want to launch our application on Windows you must: launch X server, and follow steps 8 to 12

\*\* **Additional:**
If you need anymore help with setup on windows visit this [link](https://techcommunity.microsoft.com/t5/windows-dev-appconsult/running-wsl-gui-apps-on-windows-10/ba-p/1493242)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Cluster Setup

## MacOS/Windows/Linux Installation

Follow the steps that apply to you for your operating system to install via [minikube](https://minikube.sigs.k8s.io/docs/start/)

<ul>
<li><a href="./config/Helm/ClusterREADME.md">README for Cluster Setup via Helm </a></li>
<li><a href="./config/README.md">README for KEDA Setup</a></li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give our product a star! Thanks again!

1. Fork the Open Source Product
2. Create your Feature Branch `git checkout -b feature/AmazingFeature`
3. Commit your Changes `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Authors

- Debbie Zavaleta - [Github](https://github.com/dzavaleta96) | [LinkedIn](https://www.linkedin.com/in/debbie-zavaleta/)
- Erik Stynchula - [Github](https://github.com/EStynch) | [LinkedIn](https://www.linkedin.com/in/erik-s-606035231/)
- Hashim Farah - [Github](https://github.com/Hashim-21) | [LinkedIn](https://www.linkedin.com/in/hashim-farah-b73660232/)
- Karen Shi - [Github](https://github.com/ks1009) | [LinkedIn](https://www.linkedin.com/in/karenshi/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
