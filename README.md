![KEDALyzeLogo](./src/styles/logo1.jpg?raw=true)

# KEDAlyze

A tool that the user can deploy on their Kubernetes cluster in order to visualize real-time KEDA autoscaling.  

# Functionality

KEDAlyze is an open-source product that gives the user a way to visualize KEDA's autoscaling. Allowing the user to see a visual representation of their pods scaling up and then back down as the events dissipate. We also have the basic functionality of a Kubernetes cluster visualizer, allowing the user to see the general health of their pods. KEDAlyze uses promQL queries for cluster metrics such as: in order to drive the autoscaling that is then displayed on a graph for the user. 

# Setup


rgb(38, 35, 34) -grayish black
rgb(224, 26, 79) - pinkish red
rgb(218, 255, 125) -neon green
rgb(83, 179, 203) -aqua blue
rgb(252, 188, 181) -pink


Windows Setup for Electron(All of these steps other than installing X server will be commands in your IDE terminal):

1. download and install all of these dependencies:
sudo apt install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxr
andr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

2. Go to this link to download X Server, this is how you will see the electron window: https://sourceforge.net/projects/vcxsrv/


3. Steps for X server configuration: 
	a. under 'display settings' -> select Multiple windows, set the Display number to -1, click next
	b. under select how the client starts' -> select "Start no client", click next 
	c. under 'extra settings' -> make sure to add a checkmark to disable access control, click next 
	d. click 'save configuration' and add the config.xlaunch to your desktop. Click 'finish'. 

5. Next go to Windows Security -> Firewall & network protection -> Allow an app through firewall -> make sure VcXsrv has both public and private checked

6. Before attempting to npm run anything you will always need to go to your config.xlaunch file and run it first. All you have to do is double click the file and you will see the X server icon in your system tray or taskbar. That is how  you know X server is running. 

7. Run this command on your local system this will print your nameserver IP to the terminal: export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"
	a. copy the nameserver IP, you will need it for the next step

8. In the JSON file change the electron-windows script to export DISPLAY=**put your nameserver IP here** do not add the asterisks in your JSON file
	
9. npm start (to start the webpack)

10. npm run electron-windows

11. npm run electron-start
	a. the electron application should now launch in an X server window

**Important**
If you get this error: Missing X server or $DISPLAY
		       The platform failed to initialize.  Exiting.

1. Put this command in the terminal: echo $DISPLAY -> if nothing prints to the terminal go to the next step, if a nameserver IP does print make sure it matches the export DISPLAY= in the electron-windows script 

2. repeat steps 7 and 8, make sure X server is still running, then move on to steps 9, 10, and 11

**Important**
Each and every time you want to launch our application on Windows you must: launch X server, and follow steps 7-11

**Additional**
If you need anymore help with setup on windows visit this link:
https://techcommunity.microsoft.com/t5/windows-dev-appconsult/running-wsl-gui-apps-on-windows-10/ba-p/1493242

# Contributors:  

- Karen Shi  - [Github](https://github.com/ks1009)

- Debbie Zavaleta  - [Github](https://github.com/dzavaleta96)

- Hashim Farah - [Github](https://github.com/Hashim-21)

- Erik Stynchula - [Github](https://github.com/EStynch)


