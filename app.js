const inputSelected = document.querySelector(".selected");
const inputOptionsContainer = document.querySelector(".options-container");
const inputOptionsList = document.querySelectorAll('.option');
const outputSelected = document.querySelector(".selected1");
const outputOptionsContainer = document.querySelector(".options-container1");
const outputOptionsList = document.querySelectorAll('.option1');
const input = document.querySelector(".input");
const output = document.querySelector(".output-value");
const translaterBtn = document.querySelector(".converter");
const resetBtn = document.querySelector(".btn-reset");
const navBar = document.querySelector("header");
const accordion = document.querySelectorAll(".contentBox");

inputSelected.addEventListener('click', () => {
  inputOptionsContainer.classList.toggle('active');
});

inputOptionsList.forEach(item => {
  item.addEventListener('click', () => {
    inputSelected.innerHTML = item.querySelector("label").innerHTML;
    inputOptionsContainer.classList.remove('active');
  })
})

outputSelected.addEventListener('click', () => {
  outputOptionsContainer.classList.toggle('active');
});

outputOptionsList.forEach(item => {
  item.addEventListener('click', () => {
    outputSelected.innerHTML = item.querySelector("label").innerHTML;
    outputOptionsContainer.classList.remove('active');
  })
})

const languageMap = {
  'Bengali': 'bn',
  'English': 'en',
  'Hindi': 'hi',
  'Italian': 'it',
  'Spanish': 'es',
  'Japanese': 'ja',
  'German': 'de',
  'Latin': 'la',
  'Chinese': 'zh'
}

const genLanguagePair = (inputLanguage, outputLanguage) => {
  return `${languageMap[inputLanguage]}|${languageMap[outputLanguage]}`;
}

const translate = (inputLanguage, outputLanguage, languagePair) => {
  console.log(languagePair);
  fetch(`https://api.mymemory.translated.net/get?q=${input.value}&langpair=${languagePair}`)
    .then(response => response.json())
    .then(json => {
      output.innerHTML = json.responseData.translatedText;
    });
}

translaterBtn.addEventListener('click', () => {
  translate(inputSelected.innerHTML, outputSelected.innerHTML, genLanguagePair(inputSelected.innerHTML, outputSelected.innerHTML));
});

resetBtn.addEventListener('click', () => {
  input.value = "";
  output.innerHTML = "";
})

// navbar part starts here

window.onscroll = () => {
  const sticky = navBar.offsetTop;
  if (window.pageYOffset > sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
};

// accordion part here

const runAccordion = () => {
  for (let i = 0; i < accordion.length; i += 1) {
    accordion[i].addEventListener('click', () => {
      accordion[i].classList.toggle('activate');
      for (let j = 0; j < accordion.length; j += 1) {
        if (i !== j && accordion[j].classList.contains('activate')) {
          // switches off other accordions
          accordion[j].classList.toggle('activate');
        }
      }
    });
  }
};

runAccordion();

// for the clipboard copying
new ClipboardJS('.icon.copy');

// for the scroll-reveal part
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
})

sr.reveal('.select-box', { delay: 200 });
sr.reveal('.input', { delay: 400 });
sr.reveal('.btn1', { delay: 200 });
sr.reveal('.btn2', { delay: 400 });
sr.reveal('.select-box1', { delay: 200 });
sr.reveal('.output', { delay: 400 });


// for tooltip

tippy('.icon.copy', {
  content: 'copied',
  trigger: 'click',
  hideOnClick: false,
  onShow(instance) {
    setTimeout(() => {
      instance.hide();
    }, 1000);
  }
})
