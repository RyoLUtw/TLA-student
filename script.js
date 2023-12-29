var stepsCompleted = [0, 0, 0, 0, 0]
var step2Containers = {};
var step3Containers = {};
var step2Answers = {};
var step3Answers = {};
var activeTab = "";
var revising = 0
var sentenceObject = {};
var timesTriedStep2 = 0;
/*const sentenceObject = {
    sen0: ["This","is","me"],
    sen1: ["I","am","Ryo"]
};*/
const progress = {};
var questions = []
var loadFromStudySet = false
let step3ClickedDiv
var userResponse = []
var step4Answers = []
var spannedRTArray = []
var step5highlighted = [];
var TUArray = [];

/*===================for testing===========================

//dummy draggable
for (i = 0; i < 2; i++) {
    const newElement = document.createElement('div');
    newElement.className = 'draggable';
    newElement.textContent = "東東" + i// Use the array value as the content
    newElement.draggable = 'true'
    senContainer.append(newElement)
}
createDummy();
enableDragging()



function createDummy() {

    //dummy step3Containers
    const clause0 = "Young Kids often play fun games here."
    const POSs = clause0.split(" ")
    var object = {};
    const dropAreas = document.getElementById('dropAreas');
    const containers = dropAreas.querySelectorAll('.container')

    for (i = 0; i < POSs.length; i++) {
        const newDraggable = document.createElement('div')
        newDraggable.draggable = 'true'
        newDraggable.innerHTML = POSs[i]
        containers[i].appendChild(newDraggable)
    }


    containers.forEach(function (container) {
        const elementsNodelist = container.querySelectorAll('*')
        const key = container.id
        step3Containers.sen0 = step3Containers.sen0 || {}
        step3Containers.sen0.clause0 = step3Containers.sen0.clause0 || {};
        step3Containers.sen0.clause0[key] = elementsNodelist

        step3Containers.sen1 = step3Containers.sen1 || {}
        step3Containers.sen1.clause0 = step3Containers.sen1.clause0 || {};
        step3Containers.sen1.clause0[key] = elementsNodelist

        step3Containers.sen1 = step3Containers.sen1 || {}
        step3Containers.sen1.clause1 = step3Containers.sen1.clause0 || {};
        step3Containers.sen1.clause1[key] = elementsNodelist

    });
    console.log(step3Containers)

    //dummy step4List
    Tab4SenSelect = document.getElementById("Tab4SenSelect")
    const newOption = document.createElement('option')
    newOption.text = "句子1"
    newOption.value = "sen0"
    Tab4SenSelect.appendChild(newOption)
    const newOption2 = document.createElement('option')
    newOption2.text = "句子2"
    newOption2.value = "sen1"
    Tab4SenSelect.appendChild(newOption2)
}
//=====================================================*/

// Show the default active tab
document.getElementById("Tab0").style.display = "block";
document.getElementsByClassName("tablinks")[0].className += " active";

//initialize breakPhrase Drop Area
const step2BrkPhrCon = document.getElementById("step2BrkPhrCon");
const mergePhrCon = document.getElementById("mergePhrCon");
/*step2BrkPhrCon.addEventListener("drop", (e) => {
    e.preventDefault();
    function previewBreakResult() {
        removeAllElement('breakResultPreview')
        const breakTextarea = document.getElementById("breakTextarea");
        if (!breakTextarea.value.trim() == "") {
            breakResult = breakTextarea.value.split(" ")
            console.log(breakResult)
            for (i = 0; i < breakResult.length; i++) {
                const newElement = document.createElement('div');
                newElement.className = 'draggable';
                newElement.textContent = breakResult[i]; // Use the array value as the content
                breakResultPreview.append(newElement)
            }
        }
    }
    const popup = document.getElementById("BrkPhrPopup")
    document.getElementById("brkPhrLabel").style.display = "none";
    popup.style.display = "block";
    popup.style.width = '80%'
    popup.style.top = '250px'

    const brkPhrsOverlay = document.getElementById("brkPhrsOverlay")
    brkPhrsOverlay.style.display = "block";


    const targetDraggableText = document.getElementById('step2BrkPhrCon').querySelector(":nth-child(2)").innerHTML
    const breakTextarea = document.getElementById('breakTextarea');
    const breakResultPreview = document.getElementById('breakResultPreview');
    breakTextarea.value = targetDraggableText;
    previewBreakResult()
    breakTextarea.addEventListener("input", previewBreakResult)
})

//initialize mergePhrase Drop Area
mergePhrCon.addEventListener("drop", (e) => {
    e.preventDefault();
    document.getElementById('mergePhrLabel').style.display = 'none'
    const elements = mergePhrCon.querySelectorAll('*:not(#mergePhrLabel)')
    var mergedText = ""
    elements.forEach(function (element) {
        mergedText = mergedText + element.innerHTML
        mergePhrCon.removeChild(element)
    })
    const mergedDraggable = document.createElement('div')
    mergedDraggable.innerHTML = mergedText
    mergedDraggable.className = 'draggable'
    mergedDraggable.draggable = true
    mergePhrCon.appendChild(mergedDraggable)
    enableDragging()
})

mergePhrCon.addEventListener("dragleave", (e) => {
    e.preventDefault();
    document.getElementById('mergePhrLabel').style.display = 'block'

})*/



//prevent accidental reload of the page
window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};




//==================== saving & loading ===========================================
function loadQuestionSet() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  fileInput.onchange = function(event) {
    const input = event.target;
    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
      const jsonContent = e.target.result;
      const data = JSON.parse(jsonContent);
      //read data
      step2Answers = data.step2Containers
      step3Answers = data.step3Containers
      questions = data.questions
      sentenceObject = data.sentenceObject

      //process data
      //populate dropdown
      const senSelect = document.getElementById('senSelect')
      const Tab3SenSelect = document.getElementById('Tab3SenSelect')
      const Tab4SenSelect = document.getElementById('Tab4SenSelect')

      questions.forEach(function(question, index) {
        const newOption = document.createElement('option')
        newOption.value = `sen${index}`;
        newOption.text = question.substring(0, 5) + "...";
        senSelect.appendChild(newOption)
        tab3Option = newOption.cloneNode(true)
        Tab3SenSelect.appendChild(tab3Option)
        tab4Option = newOption.cloneNode(true)
        Tab4SenSelect.appendChild(tab4Option)
        document.getElementById('tabButtonStep2').click();

      })
    };

    reader.readAsText(file);
  };

  fileInput.click();
}

function loadPrevResultFromLocalStorage() {
  const jsonData = localStorage.getItem("上次學習階段暫存");
  data = JSON.parse(jsonData)
  if (jsonData) {
    processJSONData(data);
  } else {
    alert("瀏覽器中無暫存資料")
  }
}

function saveStudySetToLocalStorage() {
  jsonString = retrieveStudySetData();
  fileName = document.getElementById("fileName").value;
  localStorage.setItem(fileName, jsonString);
  alert('學習集已儲存');
}

function saveStudySetToDevice() {
  jsonString = retrieveStudySetData();
  fileName = document.getElementById("fileName").value;
  const link = document.createElement('a');
  link.href = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
  link.download = fileName + '.json';
  link.click();
}

function saveProgress(step) {
  stepsCompleted[step - 1] = 1
  console.log(stepsCompleted)
  jsonString = retrieveStudySetData();
  fileName = "上次學習階段暫存";
  localStorage.setItem(fileName, jsonString);

}

function loadStudySetFromDevice(event) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  fileInput.onchange = function(event) {
    const input = event.target;
    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
      const jsonContent = e.target.result;
      const data = JSON.parse(jsonContent);
      processJSONData(data);
    };

    reader.readAsText(file);
  };

  fileInput.click();
}

function convert() {
  extractNodeInfo(step2Containers)
  extractNodeInfo(step3Containers)
  console.log(step2Containers)
  console.log(step3Containers)
}


function extractNodeInfo(obj) {
  // Check if the input is an object
  var newObj = {}
  if (typeof obj === 'object' && obj !== null) {
    // Iterate through the properties of the object
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // If the property is a NodeList, process each element
        if (obj[prop] instanceof NodeList) {
          const nodeListInfo = [];
          obj[prop].forEach((element) => {
            // Extract relevant information from each DOM element
            nodeListInfo.push(element.innerHTML,
            );
          });
          newObj[prop] = nodeListInfo;
        }
        // If the property is another object, recursively call the function
        else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          newObj[prop] = {}
          newObj[prop] = extractNodeInfo(obj[prop]);
        }
      }
    }
  }
  console.log(newObj)
  return newObj;
}

function retrieveStudySetData() {
  const combinedData = {
    sentenceObject: sentenceObject,
    step2Containers: step2Containers,
    step3Containers: extractNodeInfo(step3Containers),
    stepsCompleted: stepsCompleted,
    questions: questions,
    step4Answers: step4Answers,
    userResponse: userResponse,
    step5highlighted: step5highlighted
  };

  const jsonString = JSON.stringify(combinedData, null, 2);
  return jsonString;
}

function loadStudySetFromLocalStorage() {
  const fileName = document.getElementById("set-select").value
  const jsonData = localStorage.getItem(fileName);
  const data = JSON.parse(jsonData)
  processJSONData(data);
}


function processJSONData(data) {
  loadFromStudySet = true
  stepsCompleted = data.stepsCompleted;
  sentenceObject = data.sentenceObject;
  questions = data.questions;
  step4Answers = data.step4Answers;
  userResponse = data.userResponse;
  step5highlighted = data.step5highlighted;

  //populate dropdown lists
  const senSelect = document.getElementById('senSelect')
  const Tab3SenSelect = document.getElementById('Tab3SenSelect')
  const Tab4SenSelect = document.getElementById('Tab4SenSelect')

  questions.forEach(function(question, index) {
    const newOption = document.createElement('option')
    newOption.value = `sen${index}`;
    newOption.text = question.substring(0, 5) + "...";
    senSelect.appendChild(newOption)
    tab3Option = newOption.cloneNode(true)
    Tab3SenSelect.appendChild(tab3Option)
    tab4Option = newOption.cloneNode(true)
    Tab4SenSelect.appendChild(tab4Option)
    document.getElementById('tabButtonStep2').click();

  })



  step2Containers = data.step2Containers;
  step3Containers = data.step3Containers;

  console.log(step3Containers)


  if (stepsCompleted[0] == 1) {
    document.getElementById('tabButtonStep1').click();
  }
  if (stepsCompleted[1] == 1) {

    document.getElementById('tabButtonStep2').click();
  }
  if (stepsCompleted[2] == 1) {
    document.getElementById('tabButtonStep3').click();
  }
  if (stepsCompleted[3] == 1) {
    document.getElementById('tabButtonStep4').click();

  }
  if (stepsCompleted[4] == 1) {
    document.getElementById('tabButtonStep5').click();
  }



}

function listLocalStorage() {
  // Get the file names from local storage
  const fileNames = Object.keys(localStorage);

  // Populate the select element with file names
  const setSelect = document.getElementById('set-select');
  setSelect.innerHTML = "";

  if (fileNames.length == 0) {
    const option = document.createElement('option');
    option.value = 0
    option.text = "瀏覽器內無學習集"
    setSelect.appendChild(option);
  }
  fileNames.forEach(fileName => {
    if (fileName != "上次學習階段暫存") {
      const option = document.createElement('option');
      option.value = fileName;
      option.text = fileName;
      setSelect.appendChild(option);
    }
  });
}
//==================== miscellaneous ===========================================
function moveBPUI(targetUIConID, targetPopUpConID) {
  const BPUI = document.getElementById('breakPhraseUI')
  const BPPopup = document.getElementById('BrkPhrPopup')
  const targetUICon = document.getElementById(targetUIConID)
  const targetPopUpCon = document.getElementById(targetPopUpConID)
  targetUICon.appendChild(BPUI)
  targetPopUpCon.appendChild(BPPopup)
  console.log('BPUI moved')
}

function changeDivDisplay(id, displayValue) {
  document.getElementById(id).style.display = displayValue
}

function makeButtonRegular(id) {
  var element = document.getElementById(id);
  element.classList.remove('dominantButton');
  element.classList.add('regularButton');
}

function makeButtonDominant(id) {
  var element = document.getElementById(id);
  element.classList.remove('regularButton');
  element.classList.add('dominantButton');
}

function openTab(evt, tabName) {
  activeTab = tabName;
  console.log(activeTab)
  // Declare variables
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab links
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}


function removeAllElement(Id) {
  var container = document.getElementById(Id);

  if (container) {
    var elements = container.querySelectorAll("*");

    elements.forEach(function(element) {
      element.remove();
    });
  } else {
    console.log("element with specified container Id not found.")
  }
}

/*function resetDragDropAreas() {
    var dragArea = document.getElementById('clause')
    if (dragArea) {
        const dragElements = dragArea.querySelectorAll('*')
        console.log(dragElements)
        dragElements.forEach(function (dragElement) {
            dragElement.remove()
        });
    } else {
        console.log("element with specified dragArea Id not found.")
    }

    var dropAreas = document.getElementById('dropAreas');
    if (dropAreas) {
        var containers = dropAreas.querySelectorAll("div.container");
        containers.forEach(function (container) {
            elements = container.querySelectorAll("*")
            elements.forEach(function (element) {
                element.remove()
            });
        });
    } else {
        console.log("element with specified dropAreas Id not found.")
    }
}*/

function saveDragchange() {
  const object = {
    clause: [],
    subjMod: [],
    subj: [],
    verbMod: [],
    verb: [],
    objMod: [],
    obj: [],
    senMod: []
  }
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const container = document.getElementById(key)
      elements = container.querySelectorAll('*')
      object[key] = elements;
    }
  }

  const senSet = document.getElementById('senSelect').value
  progress[senSet] = object
  console.log(progress)
}

function retreiveFromContainers(Id) {
  container = document.getElementById(Id);
  elements = document.querySelectorAll('*')
  return elements
}

function getDragAfterElement(container, x) { // Change parameter name to 'x'
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = x - box.left - box.width / 2; // Use x and box.left for x-direction sorting
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
//==================== tab1 ===========================================
function clearText() {
  document.getElementById("inputText").value = ''
}


function loadText() {
  makeButtonRegular('loadTextButton')
  makeButtonDominant('correctArticleButton')
  document.getElementById('loadTextContainer').style.display = "none";
  document.getElementById('apiKeyContainer').style.display = "block";
  document.getElementById('step1Instruction').style.display = "none";

  var inputText = document.getElementById("inputText").value.trim();
  var container = document.getElementById('processedTextContainer')
  var inputText = document.getElementById("inputText").value.trim();
  questions = inputText.split('\n');

  //display paragraph count
  var paragraphCount = questions.length
  var paragraphCountP = document.createElement('p');
  paragraphCountP.innerHTML = "題目數量: " + paragraphCount + "題"
  container.appendChild(paragraphCountP)

  for (var i = 0; i < questions.length; i++) {
    var loadResult = (i + 1) + ". " + questions[i].trim();

    var sen = document.createElement('p');
    sen.innerHTML = loadResult;
    container.appendChild(sen)

  }
  document.getElementById('processedDisplay').style.display = "inline-block"

  //saveProgress(1);
}

async function tab1ToTab2() {
  const apiKey = document.getElementById("APIkey").value;
  const level = "18-year-old"
  if (revising == true) {
    alert("句子拆解中，請耐心等候");
    return;
  }

  if (!apiKey) {
    alert('請輸入API金鑰.');
    return;
  }


  revising = true;
  document.getElementById('correctingMessage').style.display = "block"
  await breakdown();


  document.getElementById('tabButtonStep2').click()
  document.getElementById('correctingMessage').style.display = "none"
  //saveProgress(2);
}

async function breakdown() {
  const sysContent = "You are helping me analysing Chinese. Break down the chinese sentence into meaningful words or phrases. I want to know which characters should be put together to interpret them correctly.";
  const userContent = "Break down the chinese sentence into meaningful words or phrases. I want to know which characters should be put together to interpret them correctly.\n我需要一個能夠和我討論功課的同學\n我們有時會違背自己的意願去做某些事情"
  const astContent = "Sure. \nsentence1:\n我\n需要\n一個\n能夠\n和\n我\n討論\n功課\n的\n同學\nTranslation: I need a classmate who could discuss homework with me.\nsentence2:\n我們\n有時\n會\n違背\n自己的\n意願\n去做\n某些\n事情"
  const temp = 0


  const input = document.getElementById('inputText').value.trim();
  const prompt = "Break down the chinese sentence into meaningful words or phrases. I want to know which characters should be put together to interpret them correctly.\n" + input;


  //send prompt
  try {
    console.log("prompt sent");
    const result = await sendPrompt(prompt, sysContent, userContent, astContent, temp);
    console.log(result)

    // Extract the part of the text after "Sure."
    const startIndex = result.indexOf("Sure.");
    const trimmedText = result.substring(startIndex + 5);
    // Divide into sentences
    const sentences = trimmedText.split(/sentence\d+:/);
    sentences.shift();
    const senSelect = document.getElementById('senSelect');
    const Tab3SenSelect = document.getElementById('Tab3SenSelect')
    const Tab4SenSelect = document.getElementById('Tab4SenSelect')
    for (let i = 0; i < sentences.length; i++) {
      //console.log(sentences[i])
      const transIndex = sentences[i].trim().indexOf("Translation: ")
      const translation = sentences[i].substring(transIndex + 14).trim()
      //console.log("翻譯: "+translation)
      const wordsCombined = sentences[i].trim().substring(0, transIndex)
      //console.log("去除翻譯: "+wordsCombined)
      const words = wordsCombined.trim().split('\n'); // Split by newline character
      //console.log(words)
      sentenceObject[`sen${i}`] = words;
      //console.log(sentenceObject)

      newOption = document.createElement('option');
      newOption.value = `sen${i}`;
      //console.log("value of option1 is " + newOption.value)
      newOption.text = wordsCombined.substring(0, 5) + "...";
      senSelect.appendChild(newOption)
      tab3Option = newOption.cloneNode(true)
      Tab3SenSelect.appendChild(tab3Option)
      tab4Option = newOption.cloneNode(true)
      Tab4SenSelect.appendChild(tab4Option)
    }
    loadSentence();

  } catch (error) {
    throw error;
  }
}

async function sendPrompt(prompt, sysContent, userContent, astContent, temperature) {
  const apiKeyElement = document.getElementById("APIkey");
  const apiKey = apiKeyElement.value;
  const progress = document.getElementById('progress');

  if (!apiKey) {
    alert('請輸入正確的API金鑰.');
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-1106',
        messages: [
          { role: 'system', content: sysContent },
          { role: 'user', content: userContent },
          { role: 'assistant', content: astContent },
          { role: 'user', content: prompt },
        ],
        temperature: temperature,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = new Error('Error: ' + response.status + ' ' + response.statusText);
      throw error;
    }

    const json = await response.json();
    const result = json.choices[0].message.content;
    return result;
  } catch (error) {
    throw error;
  }
}




//==================== tab2 ===========================================
function displayClause() {
  removeAllElement('clauseConWrapper')
  const input = document.getElementById('breakSenTextarea').value.trim()
  const clauses = input.split(" ")
  //console.log(clauses)
  addClause(clauses.length)
  const clauseContainers = document.getElementById('clauseConWrapper').querySelectorAll('div.clauseContainer')
  clauseContainers.forEach(function(container, index) {
    container.innerHTML = clauses[index]
  })
  window.scrollTo(0, document.body.scrollHeight);
  saveStepChanges();
}

function breakPhrase() {
  const breakTextarea = document.getElementById('breakTextarea')

  document.getElementById('BrkPhrPopup').style.display = "none"
  step2BrkPhrResultCon = document.getElementById('step2BrkPhrResultCon')
  const breakResultNodelist = document.getElementById('breakResultPreview').querySelectorAll('*')
  step2BrkPhrCon.removeChild(step2BrkPhrCon.querySelector(":nth-child(2)"))
  if (!breakTextarea.value.trim() == "") {
    breakResultNodelist.forEach(function(node) {
      step2BrkPhrResultCon.appendChild(node)
      node.draggable = "true"
    })
  }
  enableDragging()
  document.getElementById('brkPhrLabel').style.display = "block"
  const brkPhrsOverlay = document.getElementById("brkPhrsOverlay")
  brkPhrsOverlay.style.display = "none";

  //modify the sentenceObject to fit the change of phrases



}

function cancelBreakPhrase() {
  document.getElementById('BrkPhrPopup').style.display = "none"
  document.getElementById('brkPhrLabel').style.display = "block"
  step2BrkPhrResultCon = document.getElementById('step2BrkPhrResultCon')
  const oriDrag = step2BrkPhrCon.querySelector(":nth-child(2)")
  step2BrkPhrResultCon.appendChild(oriDrag)
  const brkPhrsOverlay = document.getElementById("brkPhrsOverlay")
  brkPhrsOverlay.style.display = "none";


}


function resetSentence() {


  if (confirm("這將會清除子句資料，恢復為原始句子，請問是否要繼續?")) {
    loadSentence();
    /*resetStep2Areas();
    const senSet = document.getElementById('senSelect').value;
    const sentence = sentenceObject[senSet];
    createStep2Draggables(sentence);
    resetStep2CheckResult();
    if (step3Containers[senSet]) {
        step3Containers[senSet] = {}
    }*/
  }
  //saveStepChanges();

}

function resetStep2CheckResult() {
  document.getElementById('step2ResultButtonContainer').style.display = "none";
  document.getElementById('step2To3Button').style.display = "none";
  document.getElementById('showStep2AnswerButton').style.display = "none";
  document.getElementById('clauseNumMessage').style.display = "none";
  document.getElementById('retryStep2Button').style.display = "none";
  timesTriedStep2 = 0
}

function loadSentence() {
  resetStep2CheckResult();
  removeAllElement('clauseConWrapper')
  const senSet = document.getElementById('senSelect').value
  const sentence = sentenceObject[senSet]
  const index = document.getElementById('senSelect').selectedIndex
  document.getElementById('oriSentence').innerHTML = questions[index]


  if (step2Containers[senSet]) {
    console.log("load")
    loadStep2Progress(senSet)

  } else {
    console.log("create")
    document.getElementById('breakSenTextarea').value = questions[index]

  }
}

function saveStepChanges() {

  if (activeTab == 'Tab2') {
    const object = {
      input: ""
    }
    //get breakSentence value
    object.input = document.getElementById('breakSenTextarea').value
    //get clauseContainers elements
    const clauseContainers = document.getElementById('clauseConWrapper').querySelectorAll('.clauseContainer')
    for (i = 0; i < clauseContainers.length; i++) {
      const containerContent = clauseContainers[i].innerHTML
      key = "clause" + (i + 1)
      object[key] = containerContent
    }
    const senSet = document.getElementById('senSelect').value
    step2Containers[senSet] = object
    console.log(step2Containers)
    if (loadFromStudySet == false) {
      if (step3Containers[senSet]) {
        step3Containers[senSet] = {}
      }
    }
  }

  if (activeTab == 'Tab3') {

    //initialize step3Containers
    const senSet = document.getElementById('Tab3SenSelect').value
    const clauseSet = document.getElementById('clauseSelect').value
    step3Containers[senSet] = step3Containers[senSet] || {};
    step3Containers[senSet][clauseSet] = step3Containers[senSet][clauseSet] || {};

    const clauseContainer = document.getElementById('clause')
    step3Containers[senSet][clauseSet]['clause'] = clauseContainer.querySelectorAll('*')
    //console.log('clauseSet: ' + clauseSet)
    const dropAreas = document.getElementById('dropAreas');
    const containers = dropAreas.querySelectorAll('.container')
    //console.log("containers: ")
    //console.log(containers)

    containers.forEach(function(container) {
      const elementsNodelist = container.querySelectorAll('*')
      const key = container.id
      //console.log("key: " + key)
      step3Containers[senSet][clauseSet][key] = elementsNodelist

    });
    console.log(step3Containers)

  }
}

function loadStep2Progress(senSet) {
  document.getElementById('breakSenTextarea').value = step2Containers[senSet]["input"]
  displayClause();
}


function enableDragging() {
  const draggables = document.querySelectorAll('.draggable');
  const containers = document.querySelectorAll('.clauseContainer, .container');

  draggables.forEach(draggable => {
    // Existing desktop logic
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      saveStepChanges();
    });

    // Mobile touch logic
    draggable.addEventListener('touchstart', (e) => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('touchend', (e) => {
      draggable.classList.remove('dragging');
      saveStepChanges();
    });
  });

  containers.forEach(container => {
    // Existing desktop logic
    container.addEventListener('dragover', (e) => handleDragOver(e, container));

    // Mobile touch logic
    container.addEventListener('touchmove', (e) => handleDragOver(e, container));
  });
}

function handleDragOver(e, container) {
  e.preventDefault();
  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const afterElement = getDragAfterElement(container, clientX);
  const draggable = document.querySelector('.dragging');
  if (afterElement == null) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElement);
  }
}

function addClause(times) {
  const fragment = document.createDocumentFragment();
  for (i = 0; i < times; i++) {
    const clauseConWrapper = document.getElementById('clauseConWrapper')

    var clauseNumber = clauseConWrapper.querySelectorAll('div.clauseContainer').length
    const newWrapper = document.createElement('div');
    newWrapper.className = "hor-wrapper";

    /*const newButton = document.createElement('button');
    newButton.className = "removeClause";
    newButton.innerHTML = "移除子句"
    newButton.addEventListener("click", function () {
        // Get a reference to the parent div
        var parentDiv = this.parentElement;

        //move all elements inside back to senContainer
        const senContainer = document.getElementById('senContainer')
        const clauses = parentDiv.querySelector('.clauseContainer').querySelectorAll('*')
        clauses.forEach(function (clause) {
            senContainer.appendChild(clause)
        })


        // Remove the parent div from its parent
        parentDiv.parentElement.removeChild(parentDiv);

        renumberClauseContainer('clauseConWrapper');
        saveStepChanges();
    });
    newWrapper.insertBefore(newButton, newWrapper.firstChild)*/

    const newContainer = document.createElement('div')
    newContainer.className = "clauseContainer";
    //newContainer.id = "clause" + (clauseNumber + 1)
    newWrapper.insertBefore(newContainer, newWrapper.firstChild)


    const newLabel = document.createElement('div')
    newLabel.className = "clauseLabel";
    newWrapper.insertBefore(newLabel, newWrapper.firstChild)

    fragment.appendChild(newWrapper)

  }
  clauseConWrapper.appendChild(fragment)
  renumberClauseContainer('clauseConWrapper')
  enableDragging()
}

function renumberClauseContainer(id) {
  const Wrapper = document.getElementById(id)
  horWrappers = Wrapper.querySelectorAll('div.hor-wrapper')
  for (i = 0; i < horWrappers.length; i++) {
    const label = horWrappers[i].querySelector('div.clauseLabel');
    label.innerHTML = "子句" + (i + 1);
    const container = horWrappers[i].querySelector('div.clauseContainer');
    container.id = "clause" + (i + 1);
  }


}


function checkStep2Answer() {
  //display checking message
  const clauseNumMessage = document.getElementById('clauseNumMessage')
  clauseNumMessage.style.display = "block"
  clauseNumMessage.innerHTML = "批改中..."
  const checkingDisplayTime = 750;

  setTimeout(function() {
    //get the current number of clauses
    var correctAnswerCount = 0;
    const clauseConWrapper = document.getElementById('clauseConWrapper')
    const clauseContainers = clauseConWrapper.querySelectorAll('div.clauseContainer')
    const clauseNumber = clauseContainers.length
    console.log("clauseNumber: ", clauseNumber)

    //get the correct number of clauses
    const senSet = document.getElementById('senSelect').value
    const correctClauseNum = Object.keys(step2Answers[senSet]).length - 1
    console.log("correctClauseNum: ", correctClauseNum)

    //if the number of clauses is wrong, display error message and stop checking.

    if (correctClauseNum != clauseNumber) {

      clauseNumMessage.innerHTML = "子句數量錯誤，應該要有" + correctClauseNum + "個子句，請調整子句數量並重新排列詞彙後，再次點選批改。"
      clauseNumMessage.style.display = "block";
      return;
    }

    //if the number of clauses is correct, start checking if each clause is correct.
    clauseContainers.forEach(function(container, index) {
      //get the user's answer
      const contentText = container.innerHTML

      //get the correct answer for the clause
      const key = "clause" + (parseInt(index) + 1)
      var correctAnswer = step2Answers[senSet][key]


      //add the correct Answer at first try
      if (timesTriedStep2 == 0) {
        const AnswerParagraph = document.createElement('p')
        AnswerParagraph.innerHTML = "子句" + (index + 1) + "解答: " + correctAnswer
        AnswerParagraph.style.color = "red"
        AnswerParagraph.style.display = "none"
        container.parentNode.insertAdjacentElement('afterend', AnswerParagraph);
      }


      //if the clause is correct, change the border to green. otherwise, change the border to red.
      step2ResultButtonContainer = document.getElementById('step2ResultButtonContainer')
      step2ResultButtonContainer.style.display = "block"
      if (contentText == correctAnswer) {
        container.style.border = "2px solid green"
        correctAnswerCount = correctAnswerCount + 1
        if (correctAnswerCount == correctClauseNum) {
          clauseNumMessage.innerHTML = "子句數量及排列均正確，請點選右方「下一步」按鈕。";
          clauseNumMessage.style.color = "green"
          clauseNumMessage.style.display = "block";
          document.getElementById('step2To3Button').style.display = "block"
          document.getElementById('showStep2AnswerButton').style.display = "none"
        }
      } else {
        clauseNumMessage.style.color = "red"
        clauseNumMessage.style.display = "block";
        container.style.border = "2px solid red"
        if (timesTriedStep2 == 0) {
          clauseNumMessage.innerHTML = "子句數量正確，但子句組成錯誤(以紅色外框標示)，請重新排列詞彙後，再次點選批改。"
        } else if (timesTriedStep2 > 0 && timesTriedStep2 < 3) {
          clauseNumMessage.innerHTML = "子句組成仍有錯誤，沒關係，試著重新排列詞彙再批改看看。"
        }

        //if the learner has try more than three times, show a popup dialog that allows users to click on "show Answer" button
        if (timesTriedStep2 >= 3) {
          document.getElementById('step2To3Button').style.display = "none"
          document.getElementById('showStep2AnswerButton').style.display = "block"
          clauseNumMessage.innerHTML = "子句組成還是不完全正確，你可以繼續嘗試，也可以點選「顯示解答」，若有問題，請詢問老師。"
        }


      }
    })
    timesTriedStep2 = timesTriedStep2 + 1
  }, checkingDisplayTime)

}

function showStep2Answer() {
  const clauseConWrapper = document.getElementById('clauseConWrapper')
  const paragraphs = clauseConWrapper.querySelectorAll('p')
  console.log("paragraphs")
  console.log(paragraphs)
  paragraphs.forEach(function(paragraph) {
    paragraph.style.display = 'block'
  })
  document.getElementById('retryStep2Button').style.display = "block";
  document.getElementById('showStep2AnswerButton').style.display = "none";
}

function goToStep3() {
  document.getElementById('tabButtonStep3').click();
  const currentSenset = document.getElementById('senSelect').value
  const step3dropdown = document.getElementById('Tab3SenSelect')
  step3dropdown.value = currentSenset;
  loadClauseSelect();

}

//==================== tab3 ===========================================
function loadClauseSelect() {
  resetStep3CheckResult()
  let clauses;
  const senSet = document.getElementById('Tab3SenSelect').value;
  if (Object.keys(step2Answers).length == 0) {
    //if step2Answer is empty, load clause from step2Containers. This indicates a teacher is creating a study set. step2Container would be the correct answer.
    console.log("loading from containers")
    clauses = step2Containers[senSet]



  } else {
    //if step2Answer is not empty, load from step2Answer. This indicates a student is practicing. Step2Contianer contains the student's answer, which is not always correct. So we load from Step2Answer to ensure the clause is correct.
    console.log("loading from answers")
    clauses = step2Answers[senSet]
  }

  const clausesKeys = Object.keys(clauses)
  const numClauses = clausesKeys.length
  const clauseSelect = document.getElementById('clauseSelect');
  clauseSelect.options.length = 0;

  for (i = 1; i < numClauses; i++) {
    //console.log('the' + i + 'loop started')

    const newOption = document.createElement('option')
    newOption.value = "clause" + (i);
    const clausekey = "clause" + i
    const optionText = clauses[clausekey]

    if (optionText.length > 5) {
      newOption.text = optionText.substring(0, 5) + '...';
    } else {
      newOption.text = optionText
    }
    clauseSelect.appendChild(newOption)
  }
  loadClause();
}

function loadClause() {
  resetStep3CheckResult()
  let clauses;
  const senSet = document.getElementById('Tab3SenSelect').value;
  if (Object.keys(step2Answers).length == 0) {
    //if step2Answer is empty, load clause from step2Containers. See loadClauseSelect() for reasons 
    clauses = step2Containers[senSet]

  } else {
    //if step2Answer is not empty, load from step2Answer. See loadClauseSelect() for reasons 
    clauses = step2Answers[senSet]
  }

  const clauseKey = document.getElementById('clauseSelect').value
  resetStep3Areas();
  document.getElementById('breakClauseTextarea').value = clauses[clauseKey]
  //console.log(step3Containers)
  if (step3Containers[senSet]) {
    if (step3Containers[senSet][clauseKey]) {
      console.log("load")
      loadStep3Draggables(clauseKey)
    }
  }
}

function displayPOS() {
  document.getElementById('breakClauseTextarea').style.border = "1px solid gray"
  const clauseContainer = document.getElementById('clause')
  const elementsToRemove = clauseContainer.querySelectorAll('*')
  elementsToRemove.forEach(function(element) {
    element.remove()
  })
  const input = document.getElementById('breakClauseTextarea').value.trim()
  if (!input == "") {
    const POSs = input.split(" ")
    //console.log(POSs)
    POSs.forEach(function(POS) {
      const newDraggable = document.createElement('div')
      newDraggable.innerHTML = POS;
      newDraggable.className = "draggable"
      newDraggable.draggable = true
      clauseContainer.appendChild(newDraggable)

      const popup = document.getElementById('dropPopup')
      newDraggable.addEventListener("click", function(event) {
        // Get the click position
        const x = event.clientX;
        const y = event.clientY;

        // Position the popup at the click position
        popup.style.left = (x - popup.offsetWidth / 2) + "px";
        popup.style.top = (y - popup.offsetHeight / 2) + "px";

        // Show the popup
        popup.style.display = "block";

        //update the current Div clicked
        step3ClickedDiv = event.target
        console.log(step3ClickedDiv)

      });
    })
  }
  enableDragging()
  saveStepChanges();
}

function moveToPOSContainer(containerID) {
  const targetContainer = document.getElementById(containerID)
  targetContainer.appendChild(step3ClickedDiv);
  saveStepChanges();
  document.getElementById('dropPopup').style.display = "none";
}

function cancelMovingPOS() {
  document.getElementById('dropPopup').style.display = "none"
}

function resetStep3Areas() {
  var dragArea = document.getElementById('clause')
  if (dragArea) {
    const dragElements = dragArea.querySelectorAll('*')
    dragElements.forEach(function(dragElement) {
      dragElement.remove()
    });
  } else {
    console.log("element with specified dragArea Id not found.")
  }

  var dropAreas = document.getElementById('dropAreas');
  if (dropAreas) {
    var containers = dropAreas.querySelectorAll("div.container");
    containers.forEach(function(container) {
      elements = container.querySelectorAll("*")
      elements.forEach(function(element) {
        element.remove()
      });
    });
  } else {
    console.log("element with specified dropAreas Id not found.")
  }
}


function loadStep3Draggables(clauseKey) {

  const senSet = document.getElementById('Tab3SenSelect').value;
  for (prop in step3Containers[senSet][clauseKey]) {
    if (Array.isArray(step3Containers[senSet][clauseKey][prop])) {
      console.log('load from Array')

      function makeDraggables(array, parentNodeID) {
        array.forEach(function(value) {
          const newDraggable = document.createElement('div')
          newDraggable.innerHTML = value
          newDraggable.draggable = true
          newDraggable.className = "draggable"
          document.getElementById(parentNodeID).appendChild(newDraggable)
        })
      }

      const containerArray = step3Containers[senSet][clauseKey][prop]
      makeDraggables(containerArray, prop)

      /*load step3 draggables

      const clauseContainer = document.getElementById('clause')
      const clauseArray = step3Containers[senSet][clauseKey].clause
      makeDraggables(clauseArray,'clause')


      const containers = document.getElementById('dropAreas').querySelectorAll('.container')

      containers.forEach(function (container) {
          const containerID = container.id
          const containerArray = step3Containers[senSet][clauseKey][containerID]
          makeDraggables(containerArray,containerID)
      })*/
    } else {
      console.log('load From Nodelist')
      const senSet = document.getElementById('Tab3SenSelect').value;
      const object = step3Containers[senSet][clauseKey];
      const clauseContainer = document.getElementById('clause')
      const clauseElements = object['clause']
      clauseElements.forEach(function(clauseElement) {
        clauseContainer.appendChild(clauseElement);
      });
      const containers = document.getElementById('dropAreas').querySelectorAll('.container')
      containers.forEach(function(container) {
        object[container.id].forEach(function(element) {
          container.appendChild(element)
        });
      })
    }
  }
  saveStepChanges();
  console.log(step3Containers)
}

function checkStep3Answer() {
  var correctCounter = 0
  const senSet = document.getElementById('Tab3SenSelect').value;
  const clauseKey = document.getElementById('clauseSelect').value
  const correctAnswers = step3Answers[senSet][clauseKey]
  const containers = document.getElementById('dropAreas').querySelectorAll('.container')
  //console.log("the containers that has been found:")
  //console.log(containers)
  containers.forEach(function(container) {
    const containerName = container.id
    const correctAnswer = correctAnswers[containerName].join('')
    var containerContent = ""
    const containerElements = container.querySelectorAll('*')
    containerElements.forEach(function(element) {
      containerContent = containerContent + element.innerHTML
    })
    if (containerContent == correctAnswer) {
      container.style.border = "2px solid green";
      correctCounter++

    } else {
      container.style.border = "2px solid red"
    }

    if (correctCounter == 7) {
      document.getElementById('nextClauseButton').style.display = "block";
      document.getElementById('step3chkAnsButton').style.display = "none";
    }

  })

}

function resetStep3CheckResult() {
  const containers = document.getElementById('dropAreas').querySelectorAll('.container')
  containers.forEach(function(container) {
    container.style.border = "1px solid gray";
    document.getElementById('nextClauseButton').style.display = "none"
    document.getElementById('step3chkAnsButton').style.display = "block"



  })
}

function nextClause() {
  scrollToElement('Tab3SenSelect');
  var clauseSelect = document.getElementById("clauseSelect");
  document.getElementById('breakClauseTextarea').style.border = "2px solid orange"
  var selectedIndex = clauseSelect.selectedIndex;
  if (selectedIndex < clauseSelect.length - 1) {
    var nextIndex = (selectedIndex + 1)
    clauseSelect.selectedIndex = nextIndex;
    loadClause()
  } else {
    alert("這是最後一個子句，將開始步驟4")
    document.getElementById('tabButtonStep4').click()
    const currentSenset = document.getElementById('Tab3SenSelect').value
    const step3dropdown = document.getElementById('Tab4SenSelect')
    step3dropdown.value = currentSenset;
    loadPOS();

  }

}

function scrollToElement(id) {
  var element = document.getElementById("Tab3SenSelect");

  if (element) {
    // Use the scrollIntoView method to scroll to the element
    element.scrollIntoView({
      behavior: "smooth", // You can use "auto" for instant scrolling or "smooth" for smooth scrolling
      block: "start"      // This ensures the top of the element is aligned with the top of the viewport
    });
  }
}

function resetClause() {
  resetStep3CheckResult()
  let clauses;
  const senSet = document.getElementById('Tab3SenSelect').value;
  if (Object.keys(step2Answers).length == 0) {
    //if step2Answer is empty, load clause from step2Containers. See loadClauseSelect() for reasons 
    clauses = step2Containers[senSet]

  } else {
    //if step2Answer is not empty, load from step2Answer. See loadClauseSelect() for reasons 
    clauses = step2Answers[senSet]
  }

  const clauseKey = document.getElementById('clauseSelect').value
  resetStep3Areas();
  document.getElementById('breakClauseTextarea').value = clauses[clauseKey]

}

//==================== tab4 ===========================================

function loadPOS() {
  const senSelect = document.getElementById('Tab4SenSelect')
  const senSet = senSelect.value
  document.getElementById('step4oriSentence').innerHTML = questions[senSelect.selectedIndex]

  const mainStructureTable = document.getElementById('mainStructureTable')
  const modifierTable = document.getElementById('modifierTable')
  //reset table
  const rowsMain = mainStructureTable.getElementsByTagName("tr");
  const rowsMod = modifierTable.getElementsByTagName("tr");
  console.log("rowsMain.length: ", rowsMain.length)
  const rowCount = rowsMain.length
  for (let i = 1; i < rowCount; i++) {

    mainStructureTable.removeChild(rowsMain[1]);
    modifierTable.removeChild(rowsMod[1]);
  }


  //reset textArea
  removeAllElement('Step4_1TextAreaContainer')
  removeAllElement('Step4_2TextAreaContainer')



  const TextAreaContainerMain = document.getElementById('Step4_1TextAreaContainer')
  const TextAreaContainerMod = document.getElementById('Step4_2TextAreaContainer')

  const clauses = Object.keys(step3Answers[senSet])

  //add clauses and corresponding POS
  clauses.forEach(function(clause, index) {
    const newRowMain = document.createElement('tr')
    const newRowMod = document.createElement('tr')
    //add row title
    const clauseTdMain = document.createElement('td')
    clauseTdMain.innerHTML = "子句" + (index + 1)
    newRowMain.appendChild(clauseTdMain)
    clauseTdMod = clauseTdMain.cloneNode(true);
    newRowMod.appendChild(clauseTdMod)
    const POS = document.getElementById('dropAreas').querySelectorAll('.container')


    POS.forEach(function(container) {
      const newTd = document.createElement('td')
      const containerID = container.id
      const newTdArray = step3Answers[senSet][clause][containerID]
      var newTdText = ""
      newTdArray.forEach(function(value) {
        newTdText = newTdText + value
      });
      newTd.innerHTML = newTdText.trim();

      const mainTablePOS = [
        "subj",
        "verb",
        "obj"
      ]
      const modifierTablePOS = [
        "subjMod",
        "verbMod",
        "objMod",
        "senMod",
      ]
      mainTablePOS.forEach(function(checkPOS) {
        if (containerID == checkPOS) {
          newRowMain.appendChild(newTd)
        }
      })
      modifierTablePOS.forEach(function(checkPOS) {
        if (containerID == checkPOS) {
          newRowMod.appendChild(newTd)
        }
      })
    });

    //append the row to table
    mainStructureTable.appendChild(newRowMain)
    modifierTable.appendChild(newRowMod)

    //add TextArea in Main structure for translation
    const newTextAreaMain = document.createElement('textarea')
    newTextAreaMain.className = "translationTextArea"
    newTextAreaMain.id = "clause" + (index + 1) + "Main"
    newTextAreaMain.placeholder = "請在此翻譯子句" + (index + 1)
    TextAreaContainerMain.appendChild(newTextAreaMain)

    //add TextArea in Mod for translation
    const newTextAreaMod = document.createElement('textarea')
    newTextAreaMod.className = "translationTextArea"
    newTextAreaMod.id = "clause" + (index + 1) + "Mod"
    newTextAreaMod.placeholder = "請在此翻譯子句" + (index + 1)
    TextAreaContainerMod.appendChild(newTextAreaMod)

    newTextAreaMain.addEventListener('input', function() {
      newTextAreaMod.value = newTextAreaMain.value
    })

    newTextAreaMod.addEventListener('input', combineClauses)
  });
}

function combineClauses() {
  const containers = document.getElementById('Step4_2TextAreaContainer').querySelectorAll('.translationTextArea');
  console.log('containers:', containers);
  var combinedText = ""
  containers.forEach(function(container) {
    combinedText = combinedText + "\n" + container.value
  })
  document.getElementById('combinedSentence').value = combinedText.trim()
}

async function checkTranslation() {
  const sysContent = "You are helping me revise translation from Chinese to English. Look at the following sentence for grammatical or lexical error. If no error or inappropriacy is present, don't make any revision and simply send back the original sentence.";
  const userContent = "Revise the following translation from Chinese to English. If no error or inappropriacy is present, don't make any revision and simply send back the original sentence.\n我需要一個能夠和我討論功課的同學\n I need a classmate who can discuss homework with me."
  const astContent = "I need a classmate who can discuss homework with me."
  const temp = 0

  const question = document.getElementById('step4oriSentence').innerHTML.trim();
  const translation = document.getElementById('combinedSentence').value.trim();
  const prompt = "Revise the following translation from Chinese to English. If no error or inappropriacy is present, don't make any revision and simply send back the original sentence.\n" + question + '\n' + translation;


  //send prompt
  try {
    console.log("prompt sent");
    const result = await sendPrompt(prompt, sysContent, userContent, astContent, temp);
    console.log(result)

    const senSet = document.getElementById('Tab4SenSelect').value
    console.log(senSet)
    step4Answers.push(result)
    userResponse.push(translation)
    console.log(step4Answers)
    compareToRevision(translation, result);


  } catch (error) {
    throw error;
  }
}

function compareToRevision(originalText, targetText) {
  var dmp = new diff_match_patch();
  var diffs = dmp.diff_main(originalText, targetText);
  dmp.diff_cleanupSemantic(diffs);
  var ds = dmp.diff_prettyHtml(diffs);
  document.getElementById('transCheckResult').innerHTML = ds
}

//==================== tab5 ===========================================

function saveSpannedTextState() {
  const spannedParagraphs = document.querySelectorAll('.spanned-text');
  let savedState = Array.from(spannedParagraphs).map(p => p.innerHTML);
  return savedState; // This array now contains the innerHTML for each individual sentence
}


function highlightSpan(event, index) {
  const span = event.target;
  //const currentIndex = document.getElementById('duplicatedSelect').value
  //const spannedText = document.getElementById('spannedText');
  if (span.classList.contains("highlighted")) {
    // Remove highlight
    span.classList.remove("highlighted");
  } else {
    // Add highlight
    span.classList.add("highlighted");

  }
  step5highlighted = saveSpannedTextState();
}

function genExampleTrans() {
  const exSenContainer = document.getElementById('exSenContainer');
  exSenContainer.style.display = "block";
  document.getElementById('practiceSettingsContainer').style.display = "block";
  document.getElementById('startReadingButton').style.display = "none";

  // Clear previous data if necessary
  spannedRTArray = []; // Reset or initialize spannedRTArray
  highlightRecord = []; // Initialize highlightRecord here

  // Generate spanned element for each correctly translated sentence, saved in spannedRTArray
  for (let i = 0; i < step4Answers.length; i++) { // Using let for proper scoping
    var words = step4Answers[i].split(" ");
    var spannedRT = words.map((word, index) => {
      return `<span id="word${index + 1}">${word}</span>`;
    }).join(" ");
    spannedRTArray.push(spannedRT);
    //highlightRecord.push([]); // Initialize an array for each sentence's highlights
  }

  // Add the original sentence and spanned sentence
  for (let i = 0; i < spannedRTArray.length; i++) {
    // Add heading
    const heading = document.createElement('p');
    heading.innerHTML = "句子" + (i + 1) + ":";
    exSenContainer.appendChild(heading);

    // Add original sentence
    const oriSen = document.createElement('p');
    oriSen.innerHTML = questions[i]; // Ensure 'questions' array exists and has data
    exSenContainer.appendChild(oriSen);

    // Add spanned sentence


    const spannedText = document.createElement('p');
    spannedText.className = 'spanned-text'; // Add a class name here
    if (step5highlighted && step5highlighted.length > 0) {
      // Load previous progress if exists
      spannedText.innerHTML = step5highlighted[i];
    } else {
      // Create new spanned Text instead
      spannedText.innerHTML = spannedRTArray[i];
    }
    exSenContainer.appendChild(spannedText);

    // Select all span elements inside spannedText and add click event
    const spanElements = spannedText.querySelectorAll("span");
    spanElements.forEach((span, index) => {
      span.dataset.index = i; // Attach the index of the sentence to each span
      span.addEventListener("click", function(event) {
        highlightSpan(event, i); // Pass event and index of the sentence to highlightSpan
      });
    });
  }

  // Your existing code to handle other actions after populating spannedRTArray
  // duplicateSelectOption(); // Uncomment if this function needs to be called here
  // goToParagraphStep5(); // Uncomment if this function needs to be called here

  window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page
}

function replaceHighlightedSpans(ID) {
  const div = document.getElementById(ID);
  const highlightedSpans = div.getElementsByClassName("highlighted");
  const highlightedArray = Array.from(highlightedSpans);
  TUArray.length = 0;
  for (let i = 0; i < highlightedArray.length; i++) {
    const span = highlightedArray[i];
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    //inputElement.value = span.textContent;

    // Calculate width based on span's text length
    const textLength = span.textContent.length;
    const minWidth = 30; // Minimum width in pixels
    const width = Math.max(minWidth, textLength * 8); // Adjust the multiplier as needed

    inputElement.style.width = `${width}px`; // Set the width dynamically

    TUArray.push(span.textContent); // Push original text content to the array

    span.parentNode.replaceChild(inputElement, span);
  }
}

function startRewrite() {

  const settings = JSON.parse(getChoices());
  // Clone the exSen div with all child nodes and elements
  const originalDiv = document.getElementById('exSenContainer')
  var duplicateDiv = originalDiv.cloneNode(true);

  // Change the ID of the cloned div (if needed) by adding "practice" suffix
  duplicateDiv.id = "clonedDiv";  // Assuming originalDiv has an id

  // Also update the IDs of any child elements that have them
  var allElementsWithId = duplicateDiv.querySelectorAll('[id]');
  allElementsWithId.forEach(function(el) {
    // Add "practice" suffix to each element's ID
    el.id += "practice";
  });

  // append the cloned div to the document
  removeAllElement('clonedDivCon')
  const parentDiv = document.getElementById('clonedDivCon')
  parentDiv.appendChild(duplicateDiv);


  if (settings["inputContent"] == 2) {
    //setup fill in the blanks practice
    replaceHighlightedSpans('clonedDivCon');
    changeDivDisplay('blankButtonContainer', 'block')

  } else {
    const spannedTexts = duplicateDiv.querySelectorAll('.spanned-text')
    spannedTexts.forEach(function(text, index) {
      // Create a new textarea element
      const textarea = document.createElement('textarea');

      // Optionally set some properties on the textarea
      textarea.value = userResponse[index]; // to copy the content from 'text' to the textarea
      textarea.style.width = "100%";
      textarea.rows = 4; // Example to set the size of the textarea

      // Insert the textarea into the DOM right after the 'text' element
      text.insertAdjacentElement('afterend', textarea);

      // Remove the 'text' element from the DOM
      text.remove();
    });

    //loadTargetUsage(settings["hintType"]);
    loadInputContent(settings["inputContent"]);
    //document.getElementById('exPassageContainer').style.display = "none"
    /*document.getElementById('practiceSettingsContainer').style.display = "none"
    document.getElementById('practiceButtonContainers').style.display = "block"
    document.getElementById('compareResult').innerHTML = ""
    //window.scrollTo(0, document.body.scrollHeight/2);*/
    changeDivDisplay('rewriteButtonContainer', 'block')
    makeButtonDominant('compareButton');
    makeButtonRegular('returnButtonRewrite')
  }
  changeDivDisplay('practiceContainer', 'block')
  changeDivDisplay('practiceButtonContainers', 'block')
  changeDivDisplay('clonedDiv', 'block')
  changeDivDisplay('exSenContainer', 'none')
  changeDivDisplay('practiceSettingsContainer', 'none')
}

function loadInputContent(inputContent) {
  const textareas = document.getElementById('clonedDivCon').querySelectorAll('textarea')
  console.log(textareas)
  if (inputContent == "0") {
    textareas.forEach(function(textarea) {
      textarea.value = ""
    })
  }
}

function loadTargetUsage(hintType) {
  // Retrieve elements with the class "highlighted"
  var highlightedElements = document.querySelectorAll('.highlighted');
  console.log(highlightedElements)
  var highlightedTextContent = [];
  for (var i = 0; i < highlightedElements.length; i++) {
    var element = highlightedElements[i];
    var textNoPunc = element.textContent.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
    highlightedTextContent.push(textNoPunc);
  }
  console.log(highlightedTextContent)
  var highlightedElementsBlanked = []
  for (i = 0; i < highlightedTextContent.length; i++) {
    var elementblanked = replaceEvenCharacters(highlightedTextContent[i], "_")
    highlightedElementsBlanked.push(elementblanked);
  }
  // Initialize an array to store the IDs of the highlighted elements
  var highlightedIDs = [];

  // Iterate over the retrieved elements
  highlightedElements.forEach((element) => {
    // Get the ID of each highlighted element
    var elementID = element.id;
    highlightedIDs.push(elementID);
  });


  var targetUsageElement = []
  var spacing = ""
  if (hintType == "blanked") {
    targetUsageElement = highlightedElementsBlanked
    spacing = "&nbsp;&nbsp;&nbsp;"
  } else {
    targetUsageElement = highlightedTextContent
    spacing = " "
  }

  var targetUsage = document.getElementById('targetUsage');
  var targetUsageText = ""


  // Iterate over the retrieved elements (assuming they are in order)
  for (var i = 0; i < highlightedIDs.length; i++) {
    // Get the IDs of the current and next highlighted elements
    var currentID = highlightedIDs[i];
    if ((i + 1) == highlightedIDs.length) {
      targetUsageText = targetUsageText + targetUsageElement[i]
      break;
    }
    var nextID = highlightedIDs[i + 1];

    // Extract the word indices from the IDs
    var currentWordIndex = parseInt(currentID.replace('word', ''));
    var nextWordIndex = parseInt(nextID.replace('word', ''));

    // Check if the word indices are adjacent
    if (nextWordIndex !== currentWordIndex + 1) {
      targetUsageText += targetUsageElement[i] + " / "
    } else {
      targetUsageText += targetUsageElement[i] + spacing
    }

  }
  targetUsage.innerHTML = targetUsageText
}

function compareToExSen() {
  const clonedDivCon = document.getElementById("clonedDivCon")
  const textAreas = clonedDivCon.querySelectorAll('textarea')

  textAreas.forEach(function(textArea, index) {
    const ori = textArea.value
    const target = step4Answers[index]

    var dmp = new diff_match_patch();
    var diffs = dmp.diff_main(ori, target);
    dmp.diff_cleanupSemantic(diffs);
    var ds = dmp.diff_prettyHtml(diffs);
    const result = document.createElement('p')
    result.innerHTML = ds
    textArea.insertAdjacentElement('afterend', result);
  })
}


function replaceEvenCharacters(word, replacement) {
  var replacedWord = '';

  for (var i = 0; i < word.length; i++) {

    if (i == 0) {
      replacedWord += word[i];
    } else if (i % 2 === 0) {
      replacedWord += replacement;
    } else {
      replacedWord += word[i];
    }
  }

  return replacedWord;
}

function duplicateSelectOption() {
  var originalSelect = document.getElementById("RtParagraphSelect");

  // Create a new select element
  var duplicatedSelect = document.getElementById("duplicatedSelect");

  // Copy options from the original select element
  for (var i = 0; i < originalSelect.options.length; i++) {
    var option = document.createElement("option");
    option.value = originalSelect.options[i].value;
    option.text = originalSelect.options[i].text;
    duplicatedSelect.appendChild(option);
  }
  duplicatedSelect.value = 0

}

function getChoices() {
  var questions = {
    hintType: "",
    inputContent: ""
  };

  var questionNames = Object.keys(questions);

  for (var i = 0; i < questionNames.length; i++) {
    var questionName = questionNames[i];
    var checkedOption = document.querySelector('input[name="' + questionName + '"]:checked');

    if (checkedOption) {
      questions[questionName] = checkedOption.value;
    } else {
      questions[questionName] = "No option selected";
    }
  }
  var questionsJSON = JSON.stringify(questions)
  return questionsJSON;
}



function showPracticeOptions() {

  changeDivDisplay('exSenContainer', 'block')
  changeDivDisplay('practiceSettingsContainer', 'block');
  //changeDivDisplay('practiceButtonContainers', 'none');
  changeDivDisplay('practiceButtonContainers', 'none');
  changeDivDisplay('blankButtonContainer', 'none');
  changeDivDisplay('rewriteButtonContainer', 'none');
  changeDivDisplay('compareResultContainer', 'none')
  changeDivDisplay('practiceContainer', 'none')

}

function checkBlanks() {
  const container = document.getElementById("practiceContainer");
  const inputs = container.querySelectorAll("input[type='text']");

  for (let i = 0; i < inputs.length; i++) {
    const inputElement = inputs[i];
    const inputValue = inputElement.value
    const correctAnswerValue = TUArray[i]

    if (inputValue === correctAnswerValue) {
      // Correct input
      inputElement.style.backgroundColor = "green";
    } else {
      // Incorrect input
      inputElement.style.backgroundColor = "yellow";
      inputElement.style.textDecoration = "line-through";

      const correctAnswer = document.createElement("span");
      correctAnswer.style.color = "red";
      correctAnswer.textContent = "(" + correctAnswerValue + ")";
      inputElement.parentNode.insertBefore(correctAnswer, inputElement.nextSibling);
    }
  }
}

//============================= StudySet Manager =========================================
function tableLocalStorageFiles() {
  var fileTable = document.getElementById("fileTable");
  var files = Object.keys(localStorage);

  while (fileTable.rows.length > 1) {
    fileTable.deleteRow(1);
  }

  for (var i = 0; i < files.length; i++) {
    var row = fileTable.insertRow(i + 1);
    var selectCell = row.insertCell(0);
    var fileNameCell = row.insertCell(1);

    fileNameCell.innerHTML = files[i];
    selectCell.innerHTML = '<input type="checkbox" name="fileCheckbox" value="' + files[i] + '">';
  }
}


function deleteSelectedFiles() {
  var checkboxes = document.getElementsByName("fileCheckbox");
  var selectedFiles = [];

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedFiles.push(checkboxes[i].value);
    }
  }

  for (var i = 0; i < selectedFiles.length; i++) {
    localStorage.removeItem(selectedFiles[i]);
  }

  // Clear the table and re-list the files
  var fileTable = document.getElementById("fileTable");
  fileTable.innerHTML = '<tr><th>選取</th><th>學習集名稱</th></tr>';
  tableLocalStorageFiles();
}