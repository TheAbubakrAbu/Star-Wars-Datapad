/*
This app was developed by Abubakr Elmallah, a 15-year-old who created this project for AP Computer Science Principles, but wanted to take it further and created a full Datapad app.
I was inspired by the iOS app "AurebeshIO" by Bence Feher, aurebesh.org and its creator(s), the Star Wars app by Disney, and the Datapad section of the Play Disney Parks app by Disney. 
Credit for Star Wars and its properties goes to the Walt Disney Company and Lucasfilm LTD.
Credit for the Aurebesh alphabet used in the alphabet screen goes to aurebesh.org.
Credit for the Aurebesh single letters goes to Pixel Sagas (https://www.dafont.com/aurebesh.font).
Credit for the Aurebesh digraphs goes to dCode.fr (dcode.fr/aurebesh-alphabet).
Credit for the "Aurebesh English" font goes to StormtrooperOnWeekends.
Credit for the Datapad logo and overlays goes to Wallpaper Clan (wallpapers-clan.com/app-icons/star-wars-datapad/).
Credit for "ButtonClick1.mp3" and "ButtonClick5.mp3" goes to ZAPSPLAT (zapsplat.com/sound-effect-category/button-clicks/).
*/

// Global:
var AurebeshType = "Basic";
var AurebeshOther = "Droid";

function SearchList(Type, List, Value){
  if(Type == "Linear") {
    for(var i = 0; i < List.length; i++) {
      if(Value == List[i]) {
        return i;
      }
    }
    return -1;
  } else if(Type == "Binary") {
    var StartIndex = 0,
      StopIndex = List.length - 1,
      Middle = Math.floor((StartIndex + StopIndex)/2);
    
    while(List[Middle] !== Value && StartIndex < StopIndex) {
      if(Value < List[Middle]){
        StopIndex = Middle - 1;
      } else if(Value > List[Middle]){
        StartIndex = Middle + 1;
      }
      Middle = Math.floor((StartIndex + StopIndex)/2);
    }
    return List[Middle] == Value ? Middle : -1;
  }
}

function ButtonNavigation(Screen, ScreenNumber, SoundNumber) {
  SoundNumber == "5" ? playSound("ButtonClick5.mp3") : playSound("ButtonClick2.mp3");
  ScreenNumber == undefined ? setScreen(Screen + "Screen") : setScreen(Screen + "Screen" + ScreenNumber);
}

function SwitchAurebeshType(Type, Other, ThemeTrue) {
  if(AurebeshType !== Type || ThemeTrue) {
    playSound("ButtonClick1.mp3");
    AurebeshType = Type;
    AurebeshOther = Other;
    for(var j = 1; j < 8; j++) {
      setProperty(AurebeshType + "Button" + j, "image", Type + "White.png");
      setProperty(AurebeshType + "Button" + j, "background-color", ThemeRGBA1);
      setProperty(AurebeshType + "Button" + j, "border-color", "black");
      setProperty(AurebeshOther + "Button" + j, "image", Other + "White.png");
      setProperty(AurebeshOther + "Button" + j, "background-color", "black");
      setProperty(AurebeshOther + "Button" + j, "border-color", (ThemeRGB.substring(0, ThemeRGB.length - 3) + " 0.3)"));
    }
    getText("EnglishInput").length > 0 ? TranslateToAurebesh() : {};
    getText("EnglishOutput").length > 0 ? TranslatingToEnglish() : {};
    ChangeAlphabet();
    Show == true ? ShowAurebesh() : {};
    getText("AurebeshSearch").length > 0 ? AurebeshSearch() : {};
    Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
    Letter.length == 1 ? setImageURL("LetterImage", Type + Letter + ".png") : setImageURL("LetterImage", "Aurebesh" + Letter + ".png");
  }
}

for(var i = 1; i < 8; i++) {
  onEvent("BasicButton" + i, "click", function() {SwitchAurebeshType("Basic", "Droid")});
  onEvent("DroidButton" + i, "click", function() {SwitchAurebeshType("Droid", "Basic")}); 
}

// Themes:
var Theme = "Droid";
var ThemeRGB = rgb(255, 255, 255);
var ThemeRGBA1 = rgb(255, 255, 255, 0.25);
var ThemeRGBA2 = rgb(255, 255, 255, 0.175);
var ThemeRGBA3 = rgb(255, 255, 255, 0.125);

function ResetSearch(True) {
  for(var i = 1; i < 7; i++) {
    showElement("Unclickable" + i);
    setProperty("AurebeshButton" + i, "background-color", rgb(0, 0, 0));
    setText("AurebeshButton" + i, "");
    setImageURL("AurebeshImage" + i, "");
  }
  True ? {} : setText("AurebeshSearch", "");
}
  
for(var i = 1; i < 8; i++) {
  onEvent("TranslatorButton" + i, "click", function() {ButtonNavigation("Translator", "1", "5")});
  onEvent("AlphabetButton" + i, "click", function() {ButtonNavigation("Alphabet", "1", "5")});
  onEvent("SearchButton" + i, "click", function() {ButtonNavigation("Search", undefined, "5")});
  onEvent("InfoButton" + i, "click", function() {ButtonNavigation("Information", "1", "5")});
  
  onEvent("AllianceButton" + i, "click", function() {
    if(Theme == "Droid") {
      Theme = "Jedi";
      ThemeButton("Jedi", rgb(5, 200, 5), rgb(5, 200, 5, 0.55), rgb(5, 200, 5, 0.3), rgb(5, 200, 5, 0.2));
    } else if(Theme == "Jedi") {
      Theme = "Rebel";
      ThemeButton("Rebel", rgb(45, 116, 200), rgb(45, 116, 200, 0.5), rgb(45, 116, 200, 0.4), rgb(45, 116, 200, 0.3));
    } else if(Theme == "Rebel") {
      Theme = "Imperial";
      ThemeButton("Imperial", rgb(200, 45, 45), rgb(200, 45, 45, 0.5), rgb(200, 45, 45, 0.45), rgb(200, 45, 45, 0.3));
    } else if(Theme == "Imperial") {
      Theme = "Mandalorian";
      ThemeButton("Mandalorian", rgb(77, 205, 162), rgb(77, 205, 162, 0.6), rgb(77, 205, 162, 0.25), rgb(77, 205, 162, 0.2));
    } else if(Theme == "Mandalorian") {
      Theme = "Hunter";
      ThemeButton("Hunter", rgb(255, 198, 16), rgb(255, 198, 16, 0.6), rgb(255, 198, 16, 0.25), rgb(255, 198, 16, 0.2));
    } else if(Theme == "Hunter") {
      Theme = "Smuggler";
      ThemeButton("Smuggler", rgb(163, 106, 220), rgb(163, 106, 220, 0.4), rgb(163, 106, 220, 0.35), rgb(163, 106, 220, 0.3));
    } else if(Theme == "Smuggler") {
      Theme = "Pirate";
      ThemeButton("Pirate", rgb(255, 120, 0), rgb(255, 120, 0, 0.55), rgb(255, 120, 0, 0.3), rgb(255, 120, 0, 0.25));
    } else if(Theme == "Pirate") {
      Theme = "Droid";
      ThemeButton("Droid", rgb(255, 255, 255), rgb(255, 255, 255, 0.25), rgb(255, 255, 255, 0.2), rgb(255, 255, 255, 0.175));
    }
  });
}

onEvent("TranslatorButton5", "click", function() {ResetSearch()});
onEvent("AlphabetButton5", "click", function() {ResetSearch()});
onEvent("SearchButton5", "click", function() {ResetSearch()});
onEvent("InfoButton5", "click", function() {ResetSearch()});

function ThemeButton(Theme, RGB, RGBA1, RGBA2, RGBA3) {
  var ScreenList = ["TranslatorScreen1", "TranslatorScreen2", "AlphabetScreen1", "AlphabetScreen2", "SearchScreen", "InformationScreen1", "InformationScreen2"];
  var NavigationButtonList = ["Translator1Button", "Translator2Button", "ShowButton", "Alphabet2Button", "RandomButton", "Information1Button", "Information2Button"];
  
  ThemeRGB = RGB;
  ThemeRGBA1 = RGBA1;
  ThemeRGBA2 = RGBA2;
  ThemeRGBA3 = RGBA3;
  
  Theme == "Droid" ? playSound("R2Beep.mp3") : {};
  Theme == "Jedi" ? playSound("ButtonClick4.mp3") : {};
  Theme == "Rebel" ? playSound("Blaster.mp3") : {};
  Theme == "Imperial" ? playSound("Imperial.mp3") : {};
  Theme == "Mandalorian" ? randomNumber(0, 1) == 0 ? playSound("Mandalorian.mp3") : playSound("Mandalorians.mp3") : {};
  Theme == "Hunter" ? playSound("BountyHunter.mp3") : {};
  Theme == "Smuggler" ? playSound("ChewieRoar.mp3") : {};
  Theme == "Pirate" ? playSound("Lightspeed.mp3") : {};
  
  SwitchAurebeshType(AurebeshType, AurebeshOther, true);
  
  for(var i = 1; i < 35; i++) {
    if(i < NavigationButtonList.length + 1) {
      setProperty(NavigationButtonList[i- 1], "background-color", RGBA1);
      setProperty(NavigationButtonList[i- 1], "text-color", "white" );
    }
    if(i < 8) {
      i < 7 ? setProperty("AurebeshButton" + i, "border-color", RGBA3) : {};
      i == 1 || i == 2 ? setProperty("TranslatorImage" + i, "icon-color", RGB) : {};
      i == 1 || i == 2 ? setProperty("TranslatorLabel" + i, "text-color", RGB) : {};
      i == 3 || i == 4 ? setProperty("AlphabetImage" + i, "icon-color", RGB) : {};
      i == 3 || i == 4 ? setProperty("AlphabetLabel" + i, "text-color", RGB) : {};
      i == 5 ? setProperty("SearchImage" + i, "icon-color", RGB) : {};
      i == 5 ? setProperty("SearchLabel" + i, "text-color", RGB) : {};
      i == 6 || i == 7 ? setProperty("InfoImage" + i, "icon-color", RGB) : {};
      i == 6 || i == 7 ? setProperty("InfoLabel" + i, "text-color", RGB) : {};
      setProperty("Rounded" + i, "image", "Rounded" + Theme + ".png");
      setProperty("AllianceImage" + i, "icon-color", RGB);
      setProperty("AllianceLabel" + i, "text-color", RGB);
      Theme == "Hunter" ? setText("AllianceLabel" + i, "Bounty Hunter") : setText("AllianceLabel" + i, Theme);
      Theme == "Hunter" ? setProperty("AllianceLabel" + i, "width", 70) : setProperty("AllianceLabel" + i, "width", 64);
      Theme == "Hunter" ? setProperty("AllianceLabel" + i, "x", 253) : setProperty("AllianceLabel" + i, "x", 256);
      if(Theme == "Droid") {
        setPosition("AllianceImage" + i, 256, 407, 64, 24);
        setProperty("AllianceImage" + i, "image", "assets/Widget-1.png");
      } else if(Theme == "Jedi") {
        setPosition("AllianceImage" + i, 256, 409, 64, 21);
        setProperty("AllianceImage" + i, "image", "Jedi.png");
      } else if(Theme == "Rebel") {
        setPosition("AllianceImage" + i, 256, 405, 64, 28);
        setProperty("AllianceImage" + i, "image", "icon://fa-rebel");
      } else if(Theme == "Imperial") {
        setPosition("AllianceImage" + i, 256, 405, 64, 28);
        setProperty("AllianceImage" + i, "image", "icon://fa-empire");
      } else if(Theme == "Mandalorian") {
        setPosition("AllianceImage" + i, 256, 403, 64, 32);
        setProperty("AllianceImage" + i, "image", "Mandalorian.jpg");
      } else if(Theme == "Hunter") {
        setPosition("AllianceImage" + i, 256, 409, 64, 20);
        setProperty("AllianceImage" + i, "image", "PykeSyndicate.png");
      } else if(Theme == "Smuggler") {
        setPosition("AllianceImage" + i, 256, 408, 64, 22);
        setProperty("AllianceImage" + i, "image", "Smuggler.png");
      } else if(Theme == "Pirate") {
        setPosition("AllianceImage" + i, 256, 407, 64, 25);
        setProperty("AllianceImage" + i, "image", "Pirate.png");
      }
    }
    if(i < 8) {
      setProperty(ScreenList[i - 1], "image", Theme + "Wallpaper.png");
    }
    i < 27 ? setProperty("Aurebesh" + EnglishList[i - 1] + "Button", "border-color", RGBA3) : {};
    setProperty(AlphabetList[i - 1] + "Button", "border-color", RGBA3);
  }
  // Translator Screen 1:
  setProperty("EnglishInput", "border-color", RGBA2);
  setProperty("AurebeshOutput", "border-color", RGBA2);
  
  // Translator Screen 2:
  setProperty("EnglishOutputBorder", "border-color", RGBA2);
  setProperty("AurebeshOutput2", "border-color", RGBA2);
  setProperty("AurebeshInput", "border-color", RGBA2);
  setProperty("AurebeshSpaceButton", "background-color", RGBA1);
  setProperty("MoreButton", "text-color", RGB);
  setProperty("MoreButton", "border-color", RGBA2);
  setProperty("AurebeshACButton", "text-color", RGB);
  setProperty("AurebeshACButton", "border-color", RGBA2);
  setProperty("AurebeshDeleteButton", "icon-color", RGB);
  setProperty("AurebeshDeleteButton", "border-color", RGBA2);
  
  // Alphabet Screen 1:
  setProperty("AlphabetBorder", "border-color", RGBA2);
  setProperty("AlphabetButton", "background-color", RGBA1);
  setProperty("AlphabetButton", "text-color", "white");
  
  // Alphabet Screen 2:
  setImageURL("AurebeshAlphabet", "AurebeshAlphabet" + Theme + ".png");
  setProperty("AurebeshAlphabet", "border-color", RGBA2);
  setProperty("AlphabetImageBorder", "border-color", RGBA2);
  
  // Search Screen:
  SearchTypeEdit();
  setProperty("AurebeshSearch", "border-color", RGBA2);
  setProperty("SearchBorder", "border-color", RGBA2);
  setProperty("AurebeshDropdown", "border-color", RGBA2);
  
  // Information Screen 1:
  setProperty("InfoTextBorder", "border-color", RGBA2);
  // Information Screen 2:
  setProperty("CreditsTextBorder", "border-color", RGBA2);
  setProperty("OpenAurebeshButton", "border-color", RGBA3);
}

// Translator Screen 1:
onEvent("Translator1Button", "click", function() {ButtonNavigation("Translator", "2")});

var EnglishInput = getText("EnglishInput").toUpperCase();
var FormerLength = EnglishInput.length;
var NewRowList1 = [21, 41, 61, 81, 101, 121, 141, 161, 181, 201, 221, 241, 261, 281, 301, 321];
var X1 = 20;
var Y1 = 44;

function TranslateToAurebesh(Type) {
  EnglishInput = getText("EnglishInput").toUpperCase();
  Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  for(var i = 1; i < (EnglishInput.length + 1 < 341 ? EnglishInput.length + 1 : 341); i++) {
    if(EnglishInput[i - 1] == " ") {
      setImageURL("1Aurebesh" + i, "");
    } else if(EnglishInput[i - 1] == "*") {
      setImageURL("1Aurebesh" + i, "AurebeshAsterisk.png");
    } else if(EnglishInput[i - 1] == ";") {
      setImageURL("1Aurebesh" + i, Type + "SemiColon.png");
    } else if(EnglishInput[i - 1] == "¥" || EnglishInput[i - 1] == "£" || EnglishInput[i - 1] == "$") {
      setImageURL("1Aurebesh" + i, "AurebeshDollar.png");
    } else if(EnglishInput[i - 1] == "€") {
      setImageURL("1Aurebesh" + i, "AurebeshEuro.png");
    } else if(EnglishInput[i - 1] == ">") {
      setImageURL("1Aurebesh" + i, "AurebeshGreaterThan.png");
    } else if(EnglishInput[i - 1] == "<") {
      setImageURL("1Aurebesh" + i, "AurebeshLessThan.png");
    } else if(EnglishInput[i - 1] == "=") {
      setImageURL("1Aurebesh" + i, "AurebeshEqual.png");
    } else if(EnglishInput[i - 1] == "+") {
      setImageURL("1Aurebesh" + i, "AurebeshPlus.png");
    } else if(EnglishInput[i - 1] == "^") {
      setImageURL("1Aurebesh" + i, "AurebeshCaret.png");
    } else if(EnglishInput[i - 1] == "%") {
      setImageURL("1Aurebesh" + i, "AurebeshPercent.png");
    } else if(EnglishInput[i - 1] == "#") {
      setImageURL("1Aurebesh" + i, "AurebeshHashtag.png");
    } else if(EnglishInput[i - 1] == "[") {
      setImageURL("1Aurebesh" + i, "AurebeshOpenBracket.png");
    } else if(EnglishInput[i - 1] == "]") {
      setImageURL("1Aurebesh" + i, "AurebeshClosedBracket.png");
    } else if(EnglishInput[i - 1] == "@") {
      setImageURL("1Aurebesh" + i, "AurebeshAt.png");
    } else if(EnglishInput[i - 1] == "&") {
      setImageURL("1Aurebesh" + i, "AurebeshAnd.png");
    } else if(EnglishInput[i - 1] == ":") {
      setImageURL("1Aurebesh" + i, "AurebeshColon.png");
    } else if(EnglishInput[i - 1] == "|") {
      setImageURL("1Aurebesh" + i, "AurebeshAbsoluteValue.png");
    } else if(EnglishInput[i - 1] == "/") {
      setImageURL("1Aurebesh" + i, "AurebeshSlash.png");
    } else if(EnglishInput[i - 1] == '"') {
      setImageURL("1Aurebesh" + i, "AurebeshQuotation.png");
    } else if(EnglishInput[i - 1] == "?") {
      setImageURL("1Aurebesh" + i, "AurebeshQuestion.png");
    } else if(EnglishInput[i - 1] == ",") {
      setImageURL("1Aurebesh" + i, "AurebeshComma.png");
    } else if(EnglishInput[i - 1] == "\\") {
      setImageURL("1Aurebesh" + i, "AurebeshBackslash.png");
    } else if(EnglishInput[i - 1] == "~") {
      setImageURL("1Aurebesh" + i, "AurebeshGrave.png");
    } else if(EnglishInput[i - 1] == "`") {
      setImageURL("1Aurebesh" + i, "AurebeshBackwards'.png");
    } else if(EnglishInput[i - 1] == "{") {
      setImageURL("1Aurebesh" + i, "AurebeshOpenCurlyBracket.png");
    } else if(EnglishInput[i - 1] == "}") {
      setImageURL("1Aurebesh" + i, "AurebeshClosedCurlyBracket.png");
    } else {
      setImageURL("1Aurebesh" + i, Type + EnglishInput[i - 1] + ".png");
    }
  }
}

onEvent("EnglishInput", "input", function() {
  FormerLength = EnglishInput.length;
  EnglishInput = getText("EnglishInput").toUpperCase();
  
  EnglishInput.length == 0 ? showElement("AurebeshPlaceholder") : hideElement("AurebeshPlaceholder");
  EnglishInput.length > 340 ? showElement("ErrorLabel1") : hideElement("ErrorLabel1");
  
  // Letters Removed
  for(var i1 = FormerLength; i1 >= (EnglishInput.length < 341 ? EnglishInput.length + 1 : 341); i1--) {
    if(SearchList("Binary", NewRowList1, i1) == -1 && i1 <= 340) {
      i1 == 1 ? X1 = 20 : X1 = X1 - 14;
      i1 == 1 ? Y1 = 44 : {};
    } else if(i1 <= 340) {
      X1 = 286;
      Y1 = Y1 - 14;
    }
    i1 <= 340 ? deleteElement("1Aurebesh" + i1) : {};
  }
  var i2 = FormerLength + 1;
  var Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  for(var i = 1; i < (EnglishInput.length < 341 ? EnglishInput.length + 1 : 341); i++) {
    // Letters Added
    if(i2 < EnglishInput.length + 1 && i2 <= 340) {
      if(SearchList("Binary", NewRowList1, i2) == -1) {
        i2 == 1 ? X1 = 20 : X1 = X1 + 14;
      } else {
        X1 = 20;
        Y1 = Y1 + 14;
      }
      image("1Aurebesh" + i2, "");
      setPosition("1Aurebesh" + i2, X1, Y1, 14, 14);
      i2++;
    }
    if(EnglishInput[i - 1] == " ") {
      setImageURL("1Aurebesh" + i, "");
    } else if(EnglishInput[i - 1] == "*") {
      setImageURL("1Aurebesh" + i, "AurebeshAsterisk.png");
    } else if(EnglishInput[i - 1] == ";") {
      setImageURL("1Aurebesh" + i, Type + "SemiColon.png");
    } else if(EnglishInput[i - 1] == "¥" || EnglishInput[i - 1] == "£" || EnglishInput[i - 1] == "$") {
      setImageURL("1Aurebesh" + i, "AurebeshDollar.png");
    } else if(EnglishInput[i - 1] == "€") {
      setImageURL("1Aurebesh" + i, "AurebeshEuro.png");
    } else if(EnglishInput[i - 1] == ">") {
      setImageURL("1Aurebesh" + i, "AurebeshGreaterThan.png");
    } else if(EnglishInput[i - 1] == "<") {
      setImageURL("1Aurebesh" + i, "AurebeshLessThan.png");
    } else if(EnglishInput[i - 1] == "=") {
      setImageURL("1Aurebesh" + i, "AurebeshEqual.png");
    } else if(EnglishInput[i - 1] == "+") {
      setImageURL("1Aurebesh" + i, "AurebeshPlus.png");
    } else if(EnglishInput[i - 1] == "^") {
      setImageURL("1Aurebesh" + i, "AurebeshCaret.png");
    } else if(EnglishInput[i - 1] == "%") {
      setImageURL("1Aurebesh" + i, "AurebeshPercent.png");
    } else if(EnglishInput[i - 1] == "#") {
      setImageURL("1Aurebesh" + i, "AurebeshHashtag.png");
    } else if(EnglishInput[i - 1] == "[") {
      setImageURL("1Aurebesh" + i, "AurebeshOpenBracket.png");
    } else if(EnglishInput[i - 1] == "]") {
      setImageURL("1Aurebesh" + i, "AurebeshClosedBracket.png");
    } else if(EnglishInput[i - 1] == "@") {
      setImageURL("1Aurebesh" + i, "AurebeshAt.png");
    } else if(EnglishInput[i - 1] == "&") {
      setImageURL("1Aurebesh" + i, "AurebeshAnd.png");
    } else if(EnglishInput[i - 1] == ":") {
      setImageURL("1Aurebesh" + i, "AurebeshColon.png");
    } else if(EnglishInput[i - 1] == "|") {
      setImageURL("1Aurebesh" + i, "AurebeshAbsoluteValue.png");
    } else if(EnglishInput[i - 1] == "/") {
      setImageURL("1Aurebesh" + i, "AurebeshSlash.png");
    } else if(EnglishInput[i - 1] == '"') {
      setImageURL("1Aurebesh" + i, "AurebeshQuotation.png");
    } else if(EnglishInput[i - 1] == "?") {
      setImageURL("1Aurebesh" + i, "AurebeshQuestion.png");
    } else if(EnglishInput[i - 1] == ",") {
      setImageURL("1Aurebesh" + i, "AurebeshComma.png");
    } else if(EnglishInput[i - 1] == "\\") {
      setImageURL("1Aurebesh" + i, "AurebeshBackslash.png");
    } else if(EnglishInput[i - 1] == "~") {
      setImageURL("1Aurebesh" + i, "AurebeshGrave.png");
    } else if(EnglishInput[i - 1] == "`") {
      setImageURL("1Aurebesh" + i, "AurebeshBackwards'.png");
    } else if(EnglishInput[i - 1] == "{") {
      setImageURL("1Aurebesh" + i, "AurebeshOpenCurlyBracket.png");
    } else if(EnglishInput[i - 1] == "}") {
      setImageURL("1Aurebesh" + i, "AurebeshClosedCurlyBracket.png");
    } else {
      setImageURL("1Aurebesh" + i, Type + EnglishInput[i - 1] + ".png");
    }
  }
});

// Translator Screen 2:
onEvent("Translator2Button", "click", function() {ButtonNavigation("Translator", "1")});

var More = false;
var MoreList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "Slash", "Colon", "SemiColon", "(", ")", "Dollar", "And", "At", "Quotation", ".", "Comma", "Question", "!", "'", "Asterisk"];
var LetterList = ["/", ":", ";", "$", "&", "@", '"', ",", "?", "*"];
var LongLetterList = ["Slash", "Colon", "SemiColon", "Dollar", "And", "At", "Quotation", "Comma", "Question", "Asterisk"];
var NoDroidList = ["/", ":", "(", ")", "&", "@", '"', ".", ",", "?", "!", "'", "*"];
var NoDroidLongList = ["Slash", "Colon", "(", ")", "And", "At", "Quotation", ".", "Comma", "Question", "!", "'", "Asterisk"];
var EnglishOutput = "";
var NewRowList2 = [25, 49, 73];
var X2 = 16;
var Y2 = 104;

function TranslatingToEnglish(Type) {
  Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  var Index = 0;
  for(var i = 0; i < EnglishOutput.length; i++) {
    if(SearchList("Linear", NoDroidList, EnglishOutput[i]) == -1 && EnglishOutput.length < 73) {
      Index = SearchList("Linear", LetterList, EnglishOutput[i]);
      Index == -1 ? setImageURL("2Aurebesh" + [i + 1], Type + EnglishOutput[i] + ".png") : setImageURL("2Aurebesh" + [i + 1], Type + LongLetterList[Index] + ".png");
    } else if(EnglishOutput.length < 73) {
      Index = SearchList("Linear", LetterList, EnglishOutput[i]);
      Index == -1 ? setImageURL("2Aurebesh" + [i + 1], "Aurebesh" + EnglishOutput[i] + ".png") : setImageURL("2Aurebesh" + [i + 1], Type + LongLetterList[Index] + ".png");
    }
  }
}
  
function TranslateToEnglish(AurebeshLetter, LongLetter, NotIncluded, Type) {
  function CreateAurebeshLetters() {
    if(SearchList("Binary", NewRowList2, EnglishOutput.length) == -1) {
      EnglishOutput.length == 1 ? X2 = 16 : X2 = X2 + 12;
    } else {
      X2 = 16;
      Y2 = Y2 + 12;
    }
    image("2Aurebesh" + EnglishOutput.length, "");
    setPosition("2Aurebesh" + EnglishOutput.length, X2, Y2, 12, 12);
  }
  
  Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  if(NotIncluded) {
    playSound("assets/category_app/app_button_1.mp3");
    EnglishOutput += AurebeshLetter;
    CreateAurebeshLetters();
    SearchList("Linear", NoDroidLongList, LongLetter) == -1 ? EnglishOutput.length < 73 ? setImageURL("2Aurebesh" + EnglishOutput.length, Type + LongLetter + ".png") : setImageURL("2Aurebesh" + EnglishOutput.length, "Aurebesh" + LongLetter + ".png") : {};
    console.log(SearchList("Linear", NoDroidLongList, LongLetter) == -1 ? Type + LongLetter + ".png" : "Aurebesh" + LongLetter + ".png");
  } else {
    if(AurebeshLetter == " ") {
      playSound("assets/category_app/snap.mp3");
      EnglishOutput += " ";
      CreateAurebeshLetters();
    } else if(AurebeshLetter == "Delete") {
      EnglishOutput.length > 0 ? playSound("assets/category_app/perfect_clean_app_button_click.mp3") : {};
      if(EnglishOutput.length > 72) {
        showElement("ErrorLabel2");
      } else {
        if(SearchList("Binary", NewRowList2, EnglishOutput.length) == -1 && EnglishOutput.length <= 72) {
          EnglishOutput.length - 1 == 1 ? X2 = 16 : X2 = X2 - 12;
          EnglishOutput.length - 1 == 1 ? Y2 = 104 : {};
        } else if(EnglishOutput.length <= 72) {
          X2 = 292;
          Y2 = Y2 - 12;
        }
        EnglishOutput.length <= 72 && EnglishOutput.length > 0 ? deleteElement("2Aurebesh" + EnglishOutput.length) : {};
      }
      EnglishOutput = EnglishOutput.slice(0, -1);
    } else if(AurebeshLetter == "AC") {
      EnglishOutput.length > 0 ? playSound("assets/category_app/perfect_clean_app_button_click.mp3") : {};
      for(var j = 1; j < EnglishOutput.length + 1; j++) {
        deleteElement("2Aurebesh" + j);
      }
      EnglishOutput = "";
    } else {
      playSound("assets/category_app/app_button_1.mp3");
      EnglishOutput += AurebeshLetter;
      setText("EnglishOutput", EnglishOutput);
      CreateAurebeshLetters();
      SearchList("Linear", NoDroidList, AurebeshLetter) == -1 ? EnglishOutput.length < 73 ? setImageURL("2Aurebesh" + EnglishOutput.length, Type + AurebeshLetter + ".png") : setImageURL("2Aurebesh" + EnglishOutput.length, "Aurebesh" + AurebeshLetter + ".png"): {};
    }
  }
  setText("EnglishOutput", EnglishOutput);
  EnglishOutput.length > 72 ? showElement("ErrorLabel2") : hideElement("ErrorLabel2");
}

function ChangeAlphabet(Type) {
  Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  if(More) {
    for(var i = 0; i < MoreList.length; i++) {
      SearchList("Linear", NoDroidLongList, MoreList[i]) == -1 ? setProperty("Aurebesh" + EnglishList[i] + "Button", "image", Type + MoreList[i] + ".png") : setProperty("Aurebesh" + EnglishList[i] + "Button", "image", "Aurebesh" + MoreList[i] + ".png");
    }
  } else {
    for(var j = 0; j < EnglishList.length; j++) {
      setProperty("Aurebesh" + EnglishList[j] + "Button", "image", Type + EnglishList[j] + ".png");
    } 
  }
}

onEvent("AurebeshAButton", "click", function() {!More ? TranslateToEnglish("A") : TranslateToEnglish("1")});
onEvent("AurebeshBButton", "click", function() {!More ? TranslateToEnglish("B") : TranslateToEnglish("2")});
onEvent("AurebeshCButton", "click", function() {!More ? TranslateToEnglish("C") : TranslateToEnglish("3")});
onEvent("AurebeshDButton", "click", function() {!More ? TranslateToEnglish("D") : TranslateToEnglish("4")});
onEvent("AurebeshEButton", "click", function() {!More ? TranslateToEnglish("E") : TranslateToEnglish("5")});
onEvent("AurebeshFButton", "click", function() {!More ? TranslateToEnglish("F") : TranslateToEnglish("6")});
onEvent("AurebeshGButton", "click", function() {!More ? TranslateToEnglish("G") : TranslateToEnglish("7")});
onEvent("AurebeshHButton", "click", function() {!More ? TranslateToEnglish("H") : TranslateToEnglish("8")});
onEvent("AurebeshIButton", "click", function() {!More ? TranslateToEnglish("I") : TranslateToEnglish("9")});
onEvent("AurebeshJButton", "click", function() {!More ? TranslateToEnglish("J") : TranslateToEnglish("0")});
onEvent("AurebeshKButton", "click", function() {!More ? TranslateToEnglish("K") : TranslateToEnglish("-")});
onEvent("AurebeshLButton", "click", function() {!More ? TranslateToEnglish("L") : TranslateToEnglish("/", "Slash", true)});
onEvent("AurebeshMButton", "click", function() {!More ? TranslateToEnglish("M") : TranslateToEnglish(":", "Colon", true)});
onEvent("AurebeshNButton", "click", function() {!More ? TranslateToEnglish("N") : TranslateToEnglish(";", "SemiColon", true)});
onEvent("AurebeshOButton", "click", function() {!More ? TranslateToEnglish("O") : TranslateToEnglish("(")});
onEvent("AurebeshPButton", "click", function() {!More ? TranslateToEnglish("P") : TranslateToEnglish(")")});
onEvent("AurebeshQButton", "click", function() {!More ? TranslateToEnglish("Q") : TranslateToEnglish("$", "Dollar", true)});
onEvent("AurebeshRButton", "click", function() {!More ? TranslateToEnglish("R") : TranslateToEnglish("&", "And", true)});
onEvent("AurebeshSButton", "click", function() {!More ? TranslateToEnglish("S") : TranslateToEnglish("@", "At", true)});
onEvent("AurebeshTButton", "click", function() {!More ? TranslateToEnglish("T") : TranslateToEnglish('"', "Quotation", true)});
onEvent("AurebeshUButton", "click", function() {!More ? TranslateToEnglish("U") : TranslateToEnglish(".")});
onEvent("AurebeshVButton", "click", function() {!More ? TranslateToEnglish("V") : TranslateToEnglish(",", "Comma", true)});
onEvent("AurebeshWButton", "click", function() {!More ? TranslateToEnglish("W") : TranslateToEnglish("?", "Question", true)});
onEvent("AurebeshXButton", "click", function() {!More ? TranslateToEnglish("X") : TranslateToEnglish("!")});
onEvent("AurebeshYButton", "click", function() {!More ? TranslateToEnglish("Y") : TranslateToEnglish("'")});
onEvent("AurebeshZButton", "click", function() {!More ? TranslateToEnglish("Z") : TranslateToEnglish("*", "Asterisk", true)});
onEvent("AurebeshSpaceButton", "click", function() {TranslateToEnglish(" ")});
onEvent("AurebeshDeleteButton", "click", function() {TranslateToEnglish("Delete")});
onEvent("AurebeshACButton", "click", function() {TranslateToEnglish("AC")});

onEvent("MoreButton", "click", function() {
  playSound("assets/category_app/arcade_game_button_tap.mp3");
  var Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  if(!More) {
    More = true;
    setText("MoreButton", "Back");
    for(var i = 0; i < MoreList.length; i++) {
      SearchList("Linear", NoDroidLongList, MoreList[i]) == -1 ? setProperty("Aurebesh" + EnglishList[i] + "Button", "image", Type + MoreList[i] + ".png") : setProperty("Aurebesh" + EnglishList[i] + "Button", "image", "Aurebesh" + MoreList[i] + ".png");
    }
  } else if(More) {
    More = false;
    setText("MoreButton", "Show More");
    for(var j = 0; j < EnglishList.length; j++) {
      setProperty("Aurebesh" + EnglishList[j] + "Button", "image", Type + EnglishList[j] + ".png");
    }
  }
});

// Alphabet Screen 1:
var Show = false;
function ShowAurebesh(Type) {
  Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  for(var i = 0; i < AlphabetList.length; i++) {
    setText(AlphabetList[i] + "Button", (Show == true ? "" : AlphabetList[i]));
    AlphabetList[i].length == 2 ? setProperty(AlphabetList[i] + "Button", "image", (Show == true ? "Aurebesh" + AlphabetList[i] + ".png" : "")) : setProperty(AlphabetList[i] + "Button", "image", (Show == true ? Type + AlphabetList[i] + ".png" : ""));
  }
}

onEvent("ShowButton", "click", function() {
  playSound("ButtonClick1.mp3");
  Show == false ? Show = true : Show = false;
  Show == false ? setText("ShowButton", "Show English/Latin Letters") : setText("ShowButton", "Show Aurebesh Letters");
  ShowAurebesh();
});

function AurebeshAlphabet(Type, EnglishPronounciation, EnglishLetter, AurebeshType2) {
  AurebeshType2 = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  Type == "Random" ? playSound("ButtonClick2.mp3") : playSound("assets/category_app/app_button_1.mp3");
  var Index;
  if(Type == "Search" || Type == "Dropdown") {
    Type == "Dropdown" ? Letter = getText("AurebeshDropdown").substring(0, 2) : {};
    Letter[1] == " " ? Letter = Letter[0] : {};
    Index = SearchList("Linear", AlphabetList, Letter);
    Index !== -1 ? Pronounciation = PronounciationList[Index] : {};
  } else if(Type == "Random") {
    PreviousRandom = NumberRandom;
    NumberRandom = randomNumber(0, 33);
    while(NumberRandom == PreviousRandom) {
      NumberRandom = randomNumber(0, 33);
    }
    Letter = AlphabetList[NumberRandom];
    Pronounciation = PronounciationList[NumberRandom];
  } else if(Type == "Aurebesh") {
    Letter = "";
    Pronounciation = "Aurebesh";
  } else {
    Letter = EnglishLetter;
    Pronounciation = EnglishPronounciation;
  }
  AlphabetType = Type;
  setScreen("AlphabetScreen2");
  Letter !== "" ? Letter.length == 2 ? setImageURL("LetterImage", "Aurebesh" + Letter + ".png") : setImageURL("LetterImage", AurebeshType2 + Letter + ".png") : setImageURL("LetterImage", "");
  setText("LetterLabel", Letter);
  setText("PronounciationLabel", "Pronounciation: " + Pronounciation);
}

onEvent("AButton", "click", function() {AurebeshAlphabet("Alphabet", "Aurek", "A")});
onEvent("BButton", "click", function() {AurebeshAlphabet("Alphabet", "Besh", "B")});
onEvent("CButton", "click", function() {AurebeshAlphabet("Alphabet", "Cresh", "C")});
onEvent("DButton", "click", function() {AurebeshAlphabet("Alphabet", "Dorn", "D")});
onEvent("EButton", "click", function() {AurebeshAlphabet("Alphabet", "Esk", "E")});
onEvent("FButton", "click", function() {AurebeshAlphabet("Alphabet", "Forn", "F")});
onEvent("GButton", "click", function() {AurebeshAlphabet("Alphabet", "Grek", "G")});
onEvent("HButton", "click", function() {AurebeshAlphabet("Alphabet", "Herf", "H")});
onEvent("IButton", "click", function() {AurebeshAlphabet("Alphabet", "Isk", "I")});
onEvent("JButton", "click", function() {AurebeshAlphabet("Alphabet", "Jenth", "J")});
onEvent("KButton", "click", function() {AurebeshAlphabet("Alphabet", "Krill", "K")});
onEvent("LButton", "click", function() {AurebeshAlphabet("Alphabet", "Leth", "L")});
onEvent("MButton", "click", function() {AurebeshAlphabet("Alphabet", "Mern", "M")});
onEvent("NButton", "click", function() {AurebeshAlphabet("Alphabet", "Nern", "N")});
onEvent("OButton", "click", function() {AurebeshAlphabet("Alphabet", "Osk", "O")});
onEvent("PButton", "click", function() {AurebeshAlphabet("Alphabet", "Peth", "P")});
onEvent("QButton", "click", function() {AurebeshAlphabet("Alphabet", "Qek", "Q")});
onEvent("RButton", "click", function() {AurebeshAlphabet("Alphabet", "Resh", "R")});
onEvent("SButton", "click", function() {AurebeshAlphabet("Alphabet", "Senth", "S")});
onEvent("TButton", "click", function() {AurebeshAlphabet("Alphabet", "Trill", "T")});
onEvent("UButton", "click", function() {AurebeshAlphabet("Alphabet", "Usk", "U")});
onEvent("VButton", "click", function() {AurebeshAlphabet("Alphabet", "Vev", "V")});
onEvent("WButton", "click", function() {AurebeshAlphabet("Alphabet", "Wesk", "W")});
onEvent("XButton", "click", function() {AurebeshAlphabet("Alphabet", "Xesh", "X")});
onEvent("YButton", "click", function() {AurebeshAlphabet("Alphabet", "Yirt", "Y")});
onEvent("ZButton", "click", function() {AurebeshAlphabet("Alphabet", "Zerek", "Z")});
onEvent("CHButton", "click", function() {AurebeshAlphabet("Alphabet", "Cherek", "CH")});
onEvent("AEButton", "click", function() {AurebeshAlphabet("Alphabet", "Enth", "AE")});
onEvent("EOButton", "click", function() {AurebeshAlphabet("Alphabet", "Onith", "EO")});
onEvent("KHButton", "click", function() {AurebeshAlphabet("Alphabet", "Krenth", "KH")});
onEvent("NGButton", "click", function() {AurebeshAlphabet("Alphabet", "Nen", "NG")});
onEvent("OOButton", "click", function() {AurebeshAlphabet("Alphabet", "Orenth", "OO")});
onEvent("SHButton", "click", function() {AurebeshAlphabet("Alphabet", "Shen", "SH")});
onEvent("THButton", "click", function() {AurebeshAlphabet("Alphabet", "Thesh", "TH")});
onEvent("AlphabetButton", "click", function() {AurebeshAlphabet("Aurebesh")});

// Alphabet Screen 2:
onEvent("Alphabet2Button", "click", function() {AlphabetType == "Alphabet" || AlphabetType == "Aurebesh"? ButtonNavigation("Alphabet", "1") : ButtonNavigation("Search")});

onEvent("PlayButton", "click", function() {
  Letter == "I" ? Pronounciation = "Issk" : {};
  Letter == "O" ? Pronounciation = "Ossk" : {};
  Letter == "Z" ? Pronounciation = "Zarek" : {};
  Letter == "NG"? Pronounciation = "Nehn" : {};
  Letter == "" ? Pronounciation = "Ahrebesh" : {};
  playSpeech(Pronounciation, "male", "English");
  hideElement("PlayButton");
  showElement("PlayImage");
  setProperty("PlayImage", "image", "icon://fa-volume-down");
  setTimeout(function() {
    setProperty("PlayImage", "image", "icon://fa-volume-up");
    setTimeout(function() {
      setProperty("PlayImage", "image", "icon://fa-play");
      hideElement("PlayImage");
      showElement("PlayButton");
    }, 750);
  }, 500);
});

// Search Screen:
onEvent("RandomButton", "click", function() {AurebeshAlphabet("Random")});

var Letter = "";
var AlphabetType;
var Pronounciation;
var NumberRandom;
var PreviousRandom;
var SearchType = "Both";
var OtherType = false;
var EnglishList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var AlphabetList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "CH", "AE", "EO", "KH", "NG", "OO", "SH", "TH"];
var DigraphList = ["CH", "AE", "EO", "KH", "NG", "OO", "SH", "TH"];
var PronounciationList = ["Aurek", "Besh", "Cresh", "Dorn", "Esk", "Forn", "Grek", "Herf", "Isk", "Jenth", "Krill", "Leth", "Mern", "Nern", "Osk", "Peth", "Qek", "Resh", "Senth", "Trill", "Usk", "Vev", "Wesk", "Xesh", "Yirt", "Zerek", "Cherek", "Enth", "Onith", "Krenth", "Nen", "Orenth", "Shen", "Thesh"];
var AurebeshDropdownList = ["Aurebesh Dropdown - Choose Letter", "A - Aurek", "B - Besh", "C - Cresh", "D - Dorn", "E - Esk", "F - Forn", "G - Grek", "H - Herf", "I - Isk", "J - Jenth", "K - Krill", "L - Leth", "M - Mern", "N - Nern", "O - Osk", "P - Peth", "Q - Qek", "R - Resh", "S - Senth", "T - Trill", "U - Usk", "V - Vev", "W - Wesk", "X - Xesh", "Y - Yirt", "Z - Zerek", "CH - Cherek", "AE - Enth", "EO - Onith", "KH - Krenth", "NG - Nen", "OO - Orenth", "SH - Shen", "TH - Thesh"];
var NoChange = true;

function SearchTypeEdit() {
  if(SearchType == "Both") {
    setProperty("SingleButton", "background-color", ThemeRGBA1);
    setProperty("SingleButton", "border-color", ThemeRGBA2);
    setProperty("SingleButton", "text-color", "white");
    setProperty("SingleButton", "border-width", 0);
    setProperty("DoubleButton", "background-color", ThemeRGBA1);
    setProperty("DoubleButton", "border-color", ThemeRGBA2);
    setProperty("DoubleButton", "text-color", "white");
    setProperty("DoubleButton", "border-width", 0);
  } else {
    setProperty(SearchType + "Button", "background-color", ThemeRGBA1);
    setProperty(SearchType + "Button", "border-color", ThemeRGBA2);
    setProperty(SearchType + "Button", "text-color", "white");
    setProperty(SearchType + "Button", "border-width", 0);
    setProperty(OtherType + "Button", "background-color", "#000000");
    setProperty(OtherType + "Button", "border-color", ThemeRGBA2);
    setProperty(OtherType + "Button", "text-color", "white");
    setProperty(OtherType + "Button", "border-width", 1);
  }
}

function AurebeshSearch(ButtonNumber, Type) {
  var TextInput = getText("AurebeshSearch").toUpperCase();
  var ResultsRow = 1;
  var Complete = false;
  var Duplicates = false;
  NoChange == true ? playSound("ButtonClick1.mp3") : {};
  Type = (AurebeshType == "Basic" ? "Aurebesh" : "DroidAurebesh");
  
  function NotDuplicates(Variable) {
    Duplicates = false;
    for(var j = 1; j < 7; j++) {
      getText("AurebeshButton" + j) == AlphabetList[Variable] + " - " + PronounciationList[Variable] ? Duplicates = true : {};
    }
    if(!Duplicates) {
      hideElement("Unclickable" + ResultsRow);
      setProperty("AurebeshButton" + ResultsRow, "background-color", "#000000");
      setText("AurebeshButton" + ResultsRow, AlphabetList[Variable] + " - " + PronounciationList[Variable]);
      setImageURL("AurebeshImage" + ResultsRow, (SearchList("Linear", DigraphList, AlphabetList[Variable]) == -1 ? Type : "Aurebesh") + AlphabetList[Variable] + ".png");
      ResultsRow++;
    }
  }
  
  function Search() {
    if(TextInput !== "") {
      if(SearchType == "Both" || SearchType == "Double") {
        for(var i1 = (SearchType == "Both" ? 0 : 26); i1 < 34; i1++) { // First Two Letters
          AlphabetList[i1] == TextInput.substring(0, 2) && ResultsRow < 7 ? NotDuplicates(i1) : {};
        }
      }
      ResultsRow == 7 ? Complete = true : {};
      if(!Complete) {
        for(var i2 = (SearchType == "Double" ? 26 : 0); i2 < (SearchType == "Single" ? 26 : 34); i2++) { // First Letter
          AlphabetList[i2][0] == TextInput[0] && ResultsRow < 7 ? NotDuplicates(i2) : {};
        }
      }
      if(SearchType == "Both" || SearchType == "Double") {
        ResultsRow == 7 ? Complete = true : {};
        if(!Complete) {
          for(var i3 = 26; i3 < 34; i3++) { // Second Letter
            AlphabetList[i3].length == 2 && (TextInput[1] !== " " || TextInput[1] !== "") && AlphabetList[i3][1] == TextInput[1] && ResultsRow < 7 ? NotDuplicates(i3) : {};
          }
        }
      }
      ResultsRow == 7 ? Complete = true : {};
      if(!Complete) {
        for(var i4 = (SearchType == "Double" ? 26 : 0); i4 < (SearchType == "Single" ? 26 : 34); i4++) {
          for(var i5 = 0; i5 < AlphabetList[i4].length; i5++) { // Includes Letter (Letter)
            TextInput.includes(AlphabetList[i4].toUpperCase()[i5]) && ResultsRow < 7 ? NotDuplicates(i4) : {};
          }
        }
      }
      ResultsRow == 7 ? Complete = true : {};
      if(!Complete) {
        for(var i6 = (SearchType == "Double" ? 26 : 0); i6 < (SearchType == "Single" ? 26 : 34); i6++) {
          for(var i7 = 0; i7 < PronounciationList[i6].length; i7++) { // Includes Letter (Pronounciation)
            TextInput.includes(PronounciationList[i6].toUpperCase()[i7]) && ResultsRow < 7 ? NotDuplicates(i6) : {};
          }
        }
      }
    }
  }
  if(ButtonNumber == undefined) {
    ResetSearch(true);
    SearchTypeEdit();
    Search();
  } else {
    getText("AurebeshButton" + ButtonNumber)[1] == " " ? Letter = getText("AurebeshButton" + ButtonNumber)[0] : Letter = getText("AurebeshButton" + ButtonNumber).substring(0, 2);  
    AurebeshAlphabet("Search");
    setText("AurebeshSearch", "");
    ResetSearch();
  }
}

onEvent("SingleButton", "click", function() {
  SearchType == "Single" ? NoChange = false : NoChange = true;
  SearchType = (SearchType == "Double" ? "Both" : (SearchType == "Single" ? "Single" : "Double"));
  OtherType = (SearchType == "Single" ? "Double" : (SearchType == "Both" ? false : "Single"));
  AurebeshSearch();
});

onEvent("DoubleButton", "click", function() {
  SearchType == "Double" ? NoChange = false : NoChange = true;
  SearchType = (SearchType == "Single" ? "Both" : (SearchType == "Double" ? "Double" : "Single"));
  OtherType = (SearchType == "Double" ? "Single" : (SearchType == "Both" ? false : "Double"));
  AurebeshSearch();
});

onEvent("AurebeshDropdown", "input", function() {
  AurebeshAlphabet("Dropdown");
  setProperty("AurebeshDropdown", "options", ["Choose Letter"]);
  setProperty("AurebeshDropdown", "options", AurebeshDropdownList);
});
onEvent("AurebeshDropdown", "change", function() {ResetSearch()});

onEvent("AurebeshSearch", "input", function() {AurebeshSearch()});
onEvent("AurebeshButton1", "click", function() {AurebeshSearch("1")});
onEvent("AurebeshButton2", "click", function() {AurebeshSearch("2")});
onEvent("AurebeshButton3", "click", function() {AurebeshSearch("3")});
onEvent("AurebeshButton4", "click", function() {AurebeshSearch("4")});
onEvent("AurebeshButton5", "click", function() {AurebeshSearch("5")});


// Information Screen 1:
onEvent("Information1Button", "click", function() {ButtonNavigation("Information", "2")});

// Information Screen 2:
onEvent("Information2Button", "click", function() {ButtonNavigation("Information", "1")});

onEvent("OpenAurebeshButton", "click", function() {
  playSound("ButtonClick1.mp3");
  open("https://starwars.fandom.com/wiki/Aurebesh/Legends#:~:text=Aurebesh%20was%20a%20writing%20system,the%20Confederacy%20of%20Independent%20Systems.");
});