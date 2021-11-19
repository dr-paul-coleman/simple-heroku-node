var jsforce = require("jsforce");
var cp = require("child_process");
var org;

const sed = ' | /usr/bin/sed "s/\x1b[[0-9;]*m//g "'; //for stripping shell formatting
const jq = ' | /usr/local/bin/jq ".result "'; //for filtering out the json result parent key 

cp.exec("sfdx force:org:display --json "+ jq + " -u devhub", (err, stdout)=>
{
    const {accessToken, instanceUrl, username, alias} = JSON.parse(stdout);
    org = new jsforce.Connection({accessToken, instanceUrl});

    org.query("SELECT count() FROM User", (error,result)=>
    {
        console.log( JSON.stringify(result));
    });

});
