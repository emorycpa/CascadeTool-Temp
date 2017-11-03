### Initial Note

This project contains code for cascade tool. It currently mix up TypeScript and JavaScript code, so please feel free to re-write TypeScript code while referring JavaScript code. 

The purpose of tool is reflected in `gulp.js` file (you may need to change some parts in `gulp.js`). 

In `gulp.js`, following steps should be followed. The *itlic* parts are the ones need to be written or re-written to TypeScript:

1. Parse all typescripts to javascript if need
2. *Write*: *Go through Github API to make sure files are up-to-date in Github*
3. Parse files based on file type (for example, sass files need to be parsed to css and minified), then move files to destination folder
4. *Re-write to TS*: *Initialize Cascade API*
5. *Re-write to TS*: *search each folder -> find files only cascade server -> move files to a temporary folder (or mark them) -> write local files to cascade 8 server -> delete files in temporary folder*

**Notes**

- The original file for step 5 is <a href="./app/process.js">process.js</a>. Please feel free to add steps and transfer it to TypeScript.

- The <a href="https://www.hannonhill.com/cascadecms/8/kb/developing-in-cascade/rest-api/index.html">REST API</a> from Hannon Hill has information to be used. An example of READ is: `https://qa.cascade.emory.edu/api/v1/read/file/CPA%20-%20Framework/js/filter.js?u=your_user_name&p=your_password` to read information in 'filter.js` in `CPA - Framework` project on cascade 8 server.

- The classes of assets is in <a href="./app/source/data/asset.ts">asset.ts</a>, referring <a href="https://qa.cascade.emory.edu/ws/services/AssetOperationService?wsdl">wsdl of cascade 8 server</a>.

### Reference Link

- <a href="readme/Old_ReadMe.md">Old Develop Note</a>: Please refer it for initial steps of running this tool

### Reference Graph

For your reference, these graphs carries initial thoughts at the beginning of developing this tool. 

<img src="./readme/Full Cycle Workflow - July 2017 Version - Page 1.png" width="800"/>
<br/>
<img src="./readme/Object Diagram - Page 1.png" width="800"/>
<br/>
<img src="./readme/Sequence_Method Diagram - Page 1.png" width="800"/>
<br/>
