const express = require('express')
const app = express()
const port = 5000
const fs = require("fs")
const { rawListeners } = require('process')
const fileName = 'data.txt'
const minLineLength = 1
const { readLastLines, readLastLinesEnc } = require("read-last-lines-ts")
var array

function CheckIfHasText(text) {
    const HasText = readLastLinesEnc("utf8")("data.txt", 1000000)
    console.log(HasText.line)
    return HasText.includes(text)
}



function AddBlackListedHWID(HWID) {
  var HWID = HWID.replace(":","")
  fs.appendFile('BlacklistedHWIDs.txt', `${HWID}\n`, function (err) {
    if (err) throw err;
    
    console.log('Saved!');
  });
}

app.get('/api/addBlacklist/:HWID',(req,res) => {
  var HWID = req.params.HWID.replace(":","")
  fs.appendFile('BlacklistedHWIDs.txt', `${HWID}\n`, function (err) {
    if (err) throw err;
    
  });
})


app.get('/', (req, res) => {
    
    res.send(`
    
  <!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <style>
    @import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;450&display=swap);button,nav{box-sizing:border-box}:root,button{font-family:'IBM Plex Sans',sans-serif;color:var(--foreground-default)}button.fill,button:hover{background-color:var(--background-higher)}:root,button{color:var(--foreground-default)}card,nav{background-color:var(--background-default)}:root{--background-root:#0E1525;--background-default:#1C2333;--background-higher:#2B3245;--background-highest:#3C445C;--background-overlay:#0e1525A0;--foreground-default:#F5F9FC;--foreground-dimmer:#C2C8CC;--foreground-dimmest:#9DA2A6;--outline-dimmest:#2B3245;--outline-dimmer:#3C445C;--outline-default:#4E5569;--outline-stronger:#5F677A;--outline-strongest:#70788C;--accent-primary-dimmest:#004182;--accent-primary-dimmer:#0053A6;--accent-primary-default:#0079F2;--accent-primary-stronger:#57ABFF;--accent-primary-strongest:#B2D9FF;--accent-positive-dimmest:#044A10;--accent-positive-dimmer:#046113;--accent-positive-default:#009118;--accent-positive-stronger:#6CD97E;--accent-positive-strongest:#BFFFCA;--accent-negative-dimmest:#660000;--accent-negative-dimmer:#A60808;--accent-negative-default:#E52222;--accent-negative-stronger:#FF6666;--accent-negative-strongest:#FFCFCF;--accent-red-dimmest:#660000;--accent-red-dimmer:#A60808;--accent-red-default:#E52222;--accent-red-stronger:#FF6666;--accent-red-strongest:#FFCFCF;--accent-orange-dimmest:#542A00;--accent-orange-dimmer:#703800;--accent-orange-default:#AD5700;--accent-orange-stronger:#D4781C;--accent-orange-strongest:#FFBD7A;--accent-yellow-dimmest:#4D4000;--accent-yellow-dimmer:#635300;--accent-yellow-default:#967D00;--accent-yellow-stronger:#BFA730;--accent-yellow-strongest:#F2E088;--accent-lime-dimmest:#314A00;--accent-lime-dimmer:#3D5C00;--accent-lime-default:#5A8700;--accent-lime-stronger:#87B825;--accent-lime-strongest:#C4E581;--accent-green-dimmest:#044A10;--accent-green-dimmer:#046113;--accent-green-default:#009118;--accent-green-stronger:#6CD97E;--accent-green-strongest:#7AEB8D;--accent-teal-dimmest:#004452;--accent-teal-dimmer:#006073;--accent-teal-default:#0093B0;--accent-teal-stronger:#27B9D6;--accent-teal-strongest:#69D9F0;--accent-blue-dimmest:#004182;--accent-blue-dimmer:#0053A6;--accent-blue-default:#0079F2;--accent-blue-stronger:#57ABFF;--accent-blue-strongest:#B2D9FF;--accent-blurple-dimmest:#39298A;--accent-blurple-dimmer:#5239CC;--accent-blurple-default:#795EFF;--accent-blurple-stronger:#A694FF;--accent-blurple-strongest:#CEC4FF;--accent-purple-dimmest:#582987;--accent-purple-dimmer:#7633B8;--accent-purple-default:#A64DFF;--accent-purple-stronger:#C78FFF;--accent-purple-strongest:#E2C4FF;--accent-magenta-dimmest:#6B1A6B;--accent-magenta-dimmer:#8A218A;--accent-magenta-default:#C73AC7;--accent-magenta-stronger:#F562F5;--accent-magenta-strongest:#FFBFFF;--accent-pink-dimmest:#6E1B52;--accent-pink-dimmer:#8F226B;--accent-pink-default:#D4359F;--accent-pink-stronger:#FF70CF;--accent-pink-strongest:#FFBAE8;--accent-grey-dimmest:#404040;--accent-grey-dimmer:#545454;--accent-grey-default:#808080;--accent-grey-stronger:#A6A6A6;--accent-grey-strongest:#D4D4D4;--accent-brown-dimmest:#594031;--accent-brown-dimmer:#75503B;--accent-brown-default:#A3765C;--accent-brown-stronger:#D49877;--accent-brown-strongest:#FFC8A8;--black:#0E1525;--white:#FCFCFC;cursor:auto;background-color:var(--background-root);overflow-x:hidden}body{margin:0}h1,h2,h3{margin-top:12px;margin-bottom:12px;font-size:175%;line-height:24px}h4,h5,h6{margin-top:8px;margin-bottom:8px;font-size:135%;line-height:24px}button,span{font-size:14px}p{margin-top:6px;margin-bottom:6px;line-height:22.4px}nav{width:100vw;height:59px;border-bottom:1.5px solid var(--outline-dimmer);padding:6px 32px;display:flex;align-items:center;flex-direction:row;gap:12px}button{height:32px;padding:8px;font-stretch:100%;display:inline-flex;flex-shrink:0;flex-direction:row;align-items:center;background-color:transparent;border:1px solid var(--outline-dimmer);border-radius:8px;cursor:pointer;transition:.2s}button.fill{border:none}button.colored{background-color:var(--accent-primary-dimmer);border:none}card,input[type=number],input[type=password],input[type=text]{transition-timing-function:ease-out;border-radius:8px;display:inline-block}button.colored:hover{filter:brightness(150%)}button:disabled,input[type=number]:disabled,input[type=password]:disabled,input[type=text]:disabled{filter:brightness(75%)}input[type=number],input[type=password],input[type=text]{transition-property:background-color,box-shadow;transition-duration:120ms;background-color:var(--background-higher);border-width:3px;border-style:solid;padding:8px;color:var(--foreground-default);border-color:var(--outline-dimmest);line-height:16px;width:100%;outline:0;font-size:14px;font-family:IBM Plex Sans,sans-serif}input[type=number]:focus-visible,input[type=password]:focus-visible,input[type=text]:focus-visible{border-color:var(--accent-primary-dimmer)}card{align-items:stretch;padding:12px;position:relative;transition-property:border-color,box-shadow;transition-duration:.12s;border:1px solid var(--outline-dimmest)}span{color:var(--foreground-dimmer)}.outline,img{outline:2px solid var(--outline-dimmer);border-radius:6px}hr{border:none;border-bottom:1px solid var(--outline-dimmer)}.content{margin:32px}::-webkit-scrollbar{background-color:var(--background-default);width:12px}::-webkit-scrollbar-thumb{background-color:var(--background-highest)}::-webkit-scrollbar-track{background-color:var(--background-default)}replit{display:inline-block;aspect-ratio:4/5;height:18px;width:14px;background-image:url("https://replitcss.codingmaster398.repl.co/replit.png");background-size:cover;background-position:center}replit.white{filter:brightness(1000%)}replit.black{filter:brightness(0%)}
    .divider{
      width:5px;
      height:auto;
      display:inline-block;
  } 
    </style>
  
  </head>
  
  <body>
   <script>
  
    function login(){
      console.log(document.getElementById("Username").value)
      if(document.getElementById("Username").value === "EternalAdminUsername") {
        if(document.getElementById("Password").value === "EternalAdminPassword") {
          window.location.replace(document.location+"blacklist");
        } else {
          alert("Wrong username or password.")
        }
      }else {
        alert("Wrong username or password.")
      }
      
    }
    
    
  </script>
  
    <div class="content">
      
  
      
      <card>
      <h4> Login</h4>
      
      <input type="text" id="Username" style="width: 740px;" placeholder="Username" ></input>
      <br>
      <br>
      <input type="password" id="Password" style="width: 740px;" placeholder="Password" ></input>
      <br>
      <br>
      <button class="colored" id="Log" style="background-color: var(--accent-negative-default)" onclick="login()">Login</button>
      </card>
      <br><br>
  
      
  
      <br><br>
  
    </div>
  </body>
  
  </html>
  
    
    `)
  })
  
  
  app.get('/blacklist', (req, res) => {
  
    res.send(`
    
  <!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <style>
    @import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;450&display=swap);button,nav{box-sizing:border-box}:root,button{font-family:'IBM Plex Sans',sans-serif;color:var(--foreground-default)}button.fill,button:hover{background-color:var(--background-higher)}:root,button{color:var(--foreground-default)}card,nav{background-color:var(--background-default)}:root{--background-root:#0E1525;--background-default:#1C2333;--background-higher:#2B3245;--background-highest:#3C445C;--background-overlay:#0e1525A0;--foreground-default:#F5F9FC;--foreground-dimmer:#C2C8CC;--foreground-dimmest:#9DA2A6;--outline-dimmest:#2B3245;--outline-dimmer:#3C445C;--outline-default:#4E5569;--outline-stronger:#5F677A;--outline-strongest:#70788C;--accent-primary-dimmest:#004182;--accent-primary-dimmer:#0053A6;--accent-primary-default:#0079F2;--accent-primary-stronger:#57ABFF;--accent-primary-strongest:#B2D9FF;--accent-positive-dimmest:#044A10;--accent-positive-dimmer:#046113;--accent-positive-default:#009118;--accent-positive-stronger:#6CD97E;--accent-positive-strongest:#BFFFCA;--accent-negative-dimmest:#660000;--accent-negative-dimmer:#A60808;--accent-negative-default:#E52222;--accent-negative-stronger:#FF6666;--accent-negative-strongest:#FFCFCF;--accent-red-dimmest:#660000;--accent-red-dimmer:#A60808;--accent-red-default:#E52222;--accent-red-stronger:#FF6666;--accent-red-strongest:#FFCFCF;--accent-orange-dimmest:#542A00;--accent-orange-dimmer:#703800;--accent-orange-default:#AD5700;--accent-orange-stronger:#D4781C;--accent-orange-strongest:#FFBD7A;--accent-yellow-dimmest:#4D4000;--accent-yellow-dimmer:#635300;--accent-yellow-default:#967D00;--accent-yellow-stronger:#BFA730;--accent-yellow-strongest:#F2E088;--accent-lime-dimmest:#314A00;--accent-lime-dimmer:#3D5C00;--accent-lime-default:#5A8700;--accent-lime-stronger:#87B825;--accent-lime-strongest:#C4E581;--accent-green-dimmest:#044A10;--accent-green-dimmer:#046113;--accent-green-default:#009118;--accent-green-stronger:#6CD97E;--accent-green-strongest:#7AEB8D;--accent-teal-dimmest:#004452;--accent-teal-dimmer:#006073;--accent-teal-default:#0093B0;--accent-teal-stronger:#27B9D6;--accent-teal-strongest:#69D9F0;--accent-blue-dimmest:#004182;--accent-blue-dimmer:#0053A6;--accent-blue-default:#0079F2;--accent-blue-stronger:#57ABFF;--accent-blue-strongest:#B2D9FF;--accent-blurple-dimmest:#39298A;--accent-blurple-dimmer:#5239CC;--accent-blurple-default:#795EFF;--accent-blurple-stronger:#A694FF;--accent-blurple-strongest:#CEC4FF;--accent-purple-dimmest:#582987;--accent-purple-dimmer:#7633B8;--accent-purple-default:#A64DFF;--accent-purple-stronger:#C78FFF;--accent-purple-strongest:#E2C4FF;--accent-magenta-dimmest:#6B1A6B;--accent-magenta-dimmer:#8A218A;--accent-magenta-default:#C73AC7;--accent-magenta-stronger:#F562F5;--accent-magenta-strongest:#FFBFFF;--accent-pink-dimmest:#6E1B52;--accent-pink-dimmer:#8F226B;--accent-pink-default:#D4359F;--accent-pink-stronger:#FF70CF;--accent-pink-strongest:#FFBAE8;--accent-grey-dimmest:#404040;--accent-grey-dimmer:#545454;--accent-grey-default:#808080;--accent-grey-stronger:#A6A6A6;--accent-grey-strongest:#D4D4D4;--accent-brown-dimmest:#594031;--accent-brown-dimmer:#75503B;--accent-brown-default:#A3765C;--accent-brown-stronger:#D49877;--accent-brown-strongest:#FFC8A8;--black:#0E1525;--white:#FCFCFC;cursor:auto;background-color:var(--background-root);overflow-x:hidden}body{margin:0}h1,h2,h3{margin-top:12px;margin-bottom:12px;font-size:175%;line-height:24px}h4,h5,h6{margin-top:8px;margin-bottom:8px;font-size:135%;line-height:24px}button,span{font-size:14px}p{margin-top:6px;margin-bottom:6px;line-height:22.4px}nav{width:100vw;height:59px;border-bottom:1.5px solid var(--outline-dimmer);padding:6px 32px;display:flex;align-items:center;flex-direction:row;gap:12px}button{height:32px;padding:8px;font-stretch:100%;display:inline-flex;flex-shrink:0;flex-direction:row;align-items:center;background-color:transparent;border:1px solid var(--outline-dimmer);border-radius:8px;cursor:pointer;transition:.2s}button.fill{border:none}button.colored{background-color:var(--accent-primary-dimmer);border:none}card,input[type=number],input[type=password],input[type=text]{transition-timing-function:ease-out;border-radius:8px;display:inline-block}button.colored:hover{filter:brightness(150%)}button:disabled,input[type=number]:disabled,input[type=password]:disabled,input[type=text]:disabled{filter:brightness(75%)}input[type=number],input[type=password],input[type=text]{transition-property:background-color,box-shadow;transition-duration:120ms;background-color:var(--background-higher);border-width:3px;border-style:solid;padding:8px;color:var(--foreground-default);border-color:var(--outline-dimmest);line-height:16px;width:100%;outline:0;font-size:14px;font-family:IBM Plex Sans,sans-serif}input[type=number]:focus-visible,input[type=password]:focus-visible,input[type=text]:focus-visible{border-color:var(--accent-primary-dimmer)}card{align-items:stretch;padding:12px;position:relative;transition-property:border-color,box-shadow;transition-duration:.12s;border:1px solid var(--outline-dimmest)}span{color:var(--foreground-dimmer)}.outline,img{outline:2px solid var(--outline-dimmer);border-radius:6px}hr{border:none;border-bottom:1px solid var(--outline-dimmer)}.content{margin:32px}::-webkit-scrollbar{background-color:var(--background-default);width:12px}::-webkit-scrollbar-thumb{background-color:var(--background-highest)}::-webkit-scrollbar-track{background-color:var(--background-default)}replit{display:inline-block;aspect-ratio:4/5;height:18px;width:14px;background-image:url("https://replitcss.codingmaster398.repl.co/replit.png");background-size:cover;background-position:center}replit.white{filter:brightness(1000%)}replit.black{filter:brightness(0%)}
    .divider{
      width:5px;
      height:auto;
      display:inline-block;
  } 
    </style>
  
  </head>
  
  <body>
   <script>
  
    function IDblacklist(){

      console.log(${CheckIfHasText("f")})
      
    }
    
    function HWIDBlacklist(){
      document.getElementById("HWIDBlacklist").innerText = "Blacklisted"
      setTimeout(ChangeNameHWIDBlacklist,5000)
      
      async function fillTheTitle() {
        console.log(document.getElementById("HWID").value)
        var b = window.location.hostname
        var b = b.replace("localhost","")
        const post = await fetch(b+"/api/addBlacklist/:"+document.getElementById("HWID").value).then((res) => res.json());
        document.getElementById("HWIDBlacklist").innerText = post.title;
      }
      fillTheTitle();
    }
    function IPBlacklist(){
      document.getElementById("IPBlacklist").innerText = "Blacklisted"
      setTimeout(ChangeNameIPBlacklist,5000)
    }
  </script>
  <script>
  function ChangeNameIDBlacklist(){
    document.getElementById("IDBlacklist").innerText = "Blacklist"
  }
  function ChangeNameHWIDBlacklist(){
    document.getElementById("HWIDBlacklist").innerText = "Blacklist"
  }
  function ChangeNameIPBlacklist(){
    document.getElementById("IPBlacklist").innerText = "Blacklist"
  }
  </script>
    <div class="content">
      
  
      <card>
      <h4>Discord ID Blacklist</h4>
      <input type="text" id="ammount" style="width: 400px;" placeholder="000000000000000000" ></input>
      <br>
      <br>
      <button class="colored" id="IDBlacklist" style="background-color: var(--accent-negative-default)" onclick="IDblacklist()">Blacklist</button>
      </card>
      <br>
      <br>
      <card>
      <h4>HWID Blacklist</h4>
      <input type="text" id="HWID" style="width: 400px;" placeholder="00000000-0000-0000-0000-000000000000" ></input>
      <br>
      <br>
      <button class="colored" id="HWIDBlacklist" style="background-color: var(--accent-negative-default)" onclick="HWIDBlacklist()">Blacklist</button>
      </card>
      <br><br>
      <card>
      <h4>IP Blacklist</h4>
      
      <input type="text" id="ammount" style="width: 740px;" placeholder="00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" ></input>
      <br>
      <br>
      <button class="colored" id="IPBlacklist" style="background-color: var(--accent-negative-default)" onclick="IPBlacklist()">Blacklist</button>
      </card>
      <br><br>
  
      
  
      <br><br>
  
    </div>
  </body>
  
  </html>
  
    
    `)
  })
  app.listen(port, () => {
    console.log(`Example app listening on port localhost:${port}`)
    console.log(CheckIfHasText(","))
})
