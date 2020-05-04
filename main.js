const searchForm = document.querySelector("#search-form") ;

const searchFormInput = document.querySelector("input") ;
const micBtn = document.querySelector("#mic-btn");
const micIcon = document.querySelector("#mic-icon") ;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true ;


if(SpeechRecognition) {
	console.log("YESSSSSSS!");
  micBtn.addEventListener("click" , micBtnClick) ;
  function micBtnClick() {
	if(micIcon.classList.contains("fa-microphone")) { //start speech recognition
	recognition.start();
} else {
	recognition.stop() ;
}
}	
recognition.addEventListener("start" , startSpeechRecognition);
 function startSpeechRecognition() {
	console.log("Started!!"); 
   micIcon.classList.remove("fa-microphone");
	micIcon.classList.add("fa-microphone-slash");
	searchFormInput.focus();
}
recognition.addEventListener("end" , endSpeechRecognition);
  function endSpeechRecognition() {
	console.log("Ended!!!");
	micIcon.classList.remove("fa-microphone-slash");
	micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
} 
 
 recognition.addEventListener("result" , resultOfSpeechRecognition);
 function resultOfSpeechRecognition(event) {
  const transcript = event.results[event.resultIndex][0].transcript ;
    if(transcript.toLowerCase().trim()==="stop recording") {
      recognition.stop();
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="go") {
        searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()==="reset input") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
  info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';
  
} else {
	console.log("NOOOOO!!");
}