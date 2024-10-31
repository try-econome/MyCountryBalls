module.exports = {
    data: {
        name: "completion",
        description: "Show Your Current Completion of WorldCB",
        type: 1,
        options: [

{

type: 6,
name: "user",
description: "User"

}

        ]
        
     },
    code: `
$defer
$if[$option[user]==;
$let[user;$authorID]
;
$let[user;$option[user]]]

$onlyIf[$getUserVar[inventory;$option[user];open]==open;$ephemeral This user has a private profile]

$if[$getUserVar[inventory;$authorID;open]!=open;$ephemeral]

$author[$userDisplayName[$get[user]];$userAvatar[$get[user]]]

$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$let[Amount;$arrayLength[ballsOwned]]
$let[owned;0]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught;$get[user]];$env[balls]]==true;
$letSum[owned;1]]
]

$let[percentage;$round[$math[($get[owned]/$get[Amount])*100];2]]

$description[$username[$botID] Progression: $get[percentage]%]

$jsonLoad[config;$readFile[./config.json]] $let[name;$env[config;Name]]

$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught;$get[user]];$env[balls]]==true;

$let[caught;$env[balls],$get[caught]];
$let[uncaught;$env[balls],$get[uncaught]]]
]

$arrayLoad[owned;,;$get[caught]]

$arrayForEach[owned;id;

$if[$env[id]==;;

$jsonLoad[json;$readFile[Balls/$env[id].json]]

$let[caught2;<:emoji:$env[json;emojiID]> $get[caught2]]

]

]

$arrayLoad[unowned;,;$get[uncaught]]

$arrayForEach[unowned;id;

$if[$env[id]==;;

$jsonLoad[json;$readFile[Balls/$env[id].json]]

$let[uncaught2;<:emoji:$env[json;emojiID]> $get[uncaught2]]

]

]

$if[$get[percentage]==0;$addField[Owned $get[name]'s';You Don't own Any $get[name]'s Yet.];$addField[Owned $get[name]'s;$get[caught2]]]
$if[$get[percentage]==100;$addField[Missing $get[name]'s;You completed the bot congratulations! 🎉];$addField[Missing $get[name]'s;$get[uncaught2]]]

    
    `
}