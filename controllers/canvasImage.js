const {createCanvas, loadImage} = require("canvas");
// const fs = require("fs");
// const path = require("path");
// const canvas = require("canvas"),
//     jsdom = require("jsdom"),
//     C2S = require("canvas-to-svg").default;
const saveimage = async (imageid) => {
     
    // const {JSDOM} = jsdom;
    // const document = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

const context = new C2S({ document: document });

context.fillStyle = "#fff";
context.fillRect(0,0,512,512);  
context.fillStyle = "#000";
const imagePosition = {
    w:512,
    h:512,
    x:0,
    y:0
}

var jsonobject = 
    "[{\"signs\":[3],\"planets\":[],\"planets_small\":[],\"planet_signs\":[]},{\"signs\":[3,4],\"planets\":[],\"planets_small\":[],\"planet_signs\":[]},{\"signs\":[4,5],\"planets\":[],\"planets_small\":[],\"planet_signs\":[]},{\"signs\":[5,6],\"planets\":[],\"planets_small\":[],\"planet_signs\":[]},{\"signs\":[6,7,8],\"planets\":[\"Sun\",\"Saturn\"],\"planets_small\":[\"Su \",\"Sa \"],\"planet_signs\":[7,7]},{\"signs\":[8,9],\"planets\":[\"Mercury\",\"Venus\",\"Ketu\"],\"planets_small\":[\"Me \",\"Ve \",\"Ke \"],\"planet_signs\":[8,8,8]},{\"signs\":[9],\"planets\":[\"Jupiter\"],\"planets_small\":[\"Ju \"],\"planet_signs\":[9]},{\"signs\":[9,10],\"planets\":[\"Mars\"],\"planets_small\":[\"Ma \"],\"planet_signs\":[10]},{\"signs\":[10,11],\"planets\":[],\"planets_small\":[],\"planet_signs\":[]},{\"signs\":[11,12],\"planets\":[],\"planets_small\":[],\"planet_signs\":[]},{\"signs\":[12,1,2],\"planets\":[\"Moon\"],\"planets_small\":[\"Mo \"],\"planet_signs\":[1]},{\"signs\":[2,3],\"planets\":[\"Rahu\"],\"planets_small\":[\"Ra \"],\"planet_signs\":[2]}]";

const props = JSON.parse(jsonobject);

const gettext = (context, planetstext,startx,starty) =>  {
    var length = planetstext.length;
    planetstext.forEach(element => {
       context.fillText(element,startx,starty);

          starty = starty + 20;
    });
    return ''; 
};

    
    


context.font = "19px Ariel";


context.fillText(props[0].signs.length > 1 ? props[0].signs.slice(0,1) : props[0].signs ,250,219);
gettext(context,props[0].planets_small,250,119);
context.fillText(props[1].signs.length > 1 ? props[1].signs.slice(0,1) : props[1].signs,125,109);
gettext(context,props[1].planets_small,125,19);
context.fillText(props[2].signs.length > 1 ? props[2].signs.slice(0,1) : props[2].signs,80,139);
gettext(context,props[2].planets_small,30,39);
context.fillText(props[3].signs.length > 1 ? props[3].signs.slice(0,1) : props[3].signs,210,265);
gettext(context,props[3].planets_small,220,270);
context.fillText(props[4].signs.length > 1 ? props[4].signs.slice(0,1) : props[4].signs,90,390);
gettext(context,props[4].planets_small,30,350);
context.fillText(props[5].signs.length > 1 ? props[5].signs.slice(0,1) : props[5].signs,120,430);
gettext(context,props[5].planets_small,120,450);
context.fillText(props[6].signs.length > 1 ? props[6].signs.slice(0,1) : props[6].signs,250,300);
gettext(context,props[6].planets_small,250,330);
context.fillText(props[7].signs.length > 1 ? props[7].signs.slice(0,1) : props[7].signs,380,430);
gettext(context,props[7].planets_small,370,450);
context.fillText(props[8].signs.length > 1 ? props[8].signs.slice(0,1) : props[8].signs,410,390);
gettext(context,props[8].planets_small,400,400);
context.fillText(props[9].signs.length > 1 ? props[9].signs.slice(0,1) : props[9].signs,280,265);
gettext(context,props[9].planets_small,275,270);
context.fillText(props[10].signs.length > 1 ? props[10].signs.slice(0,1) : props[10].signs,400,139);
gettext(context,props[10].planets_small,450,101);
context.fillText(props[11].signs.length > 1 ? props[11].signs.slice(0,1) : props[11].signs,370,109);
gettext(context,props[11].planets_small,370,39);



context.restore();
loadImage("/var/www/html/astrology/Astrology-Backend-main/public/assets/kundali1.png").then((kundlimage) => {
    const {w,h,x,y} = imagePosition;
    context.drawImage(kundlimage,x,y,w,h);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("/var/www/html/astrology/Astrology-Backend-main/public/assets/img/"+imageid+".png",buffer);
});
return imageid;
}
module.exports = saveimage;