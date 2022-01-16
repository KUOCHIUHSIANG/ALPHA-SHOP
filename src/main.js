const btnControl = document.querySelector('.main__button')
const nextBtn = btnControl.querySelector('.next')
const previousBtn = btnControl.querySelector('.previous')
const steps = document.querySelectorAll('.step')
const formParts = document.querySelectorAll('.part')
let step = 0

function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.next') && e.target.innerHTML === '下一步 →') {
    const nextStep = steps[step + 1]
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } 
  else if (e.target.matches('.previous')) {
    const preStep = steps[step - 1]
    nowStep.classList.remove('active')
    preStep.classList.remove('checked')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  btnStateSwitch()
}

function btnStateSwitch(){
  console.log(step)
  if (step === 0) {
    previousBtn.parentElement.classList.add('d-none')
    nextBtn.parentElement.classList.add('stepOne')
    btnControl.classList.add('justify-content-flex-end')
    btnControl.classList.remove('justify-content-space-between')
  } else {
    previousBtn.parentElement.classList.remove('d-none')
    nextBtn.parentElement.classList.remove('stepOne')
    btnControl.classList.add('justify-content-space-between')
    btnControl.classList.remove('justify-content-flex-end')
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步 &#8594'
  }
}


btnControl.addEventListener('click', handleBtnControlClicked)