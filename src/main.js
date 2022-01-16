const btnControl = document.querySelector('.main__button')
const nextBtn = btnControl.querySelector('.next')
const previousBtn = btnControl.querySelector('.previous')
const steps = document.querySelectorAll('.step')
const formParts = document.querySelectorAll('.part')
const standardDeliveryControl = document.querySelector('.standard-delivery')
const dhlDeliveryControl = document.querySelector('.dhl-delivery')
const standardDeliveryInput = document.getElementById('standard-delivery')
const dhlDeliveryInput = document.getElementById('dhl-delivery')
const deliveryFee = document.querySelector('.fee')
const counterControl = document.querySelectorAll('.main__cart__item__counter')


let step = 0
// 運送方式的運費 未來可直接新增或修改
const standardDeliveryFee = '免費'
const dhlDeliveryFee = 500;


// 改變stepper狀態 及按鈕文字
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

// 改變按鈕的狀態
function btnStateSwitch() {
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
// 改變所選運送方式的外框及更改購物車運費
function handleLabelControlClicked() {
  if (standardDeliveryInput.checked === true) {
    standardDeliveryControl.firstElementChild.classList.add('delivery-active')
    dhlDeliveryControl.firstElementChild.classList.remove('delivery-active')
    deliveryFee.innerText = standardDeliveryFee
    deliveryFee.classList.remove('currencySymbol')
    
  } else if ((dhlDeliveryInput.checked === true)) {
    dhlDeliveryControl.firstElementChild.classList.add('delivery-active')
    standardDeliveryControl.firstElementChild.classList.remove('delivery-active')
    deliveryFee.innerText = dhlDeliveryFee
    deliveryFee.classList.add('currencySymbol')
  }
}

// counter 計數器
function handleCounterClicked(e) {
  const target = e.target
  let amountElement = target.parentElement.children[1]
  let amount = Number(amountElement.innerText)
  if (target.matches('.main__cart__item__counter__minus')) {
    console.log('-')
    if (amount === 1) {
      return
    } else {
      amount -= 1
      amountElement.innerText = amount
      calcTotal(amount, target)
    }
  } else if (target.matches('.main__cart__item__counter__plus')) {
    console.log('+')
    amount += 1
    amountElement.innerText = amount
    calcTotal(amount, target)
  }
}

// cart 計算小計  （未完成... 目前還不能計算總金額）
function calcTotal(amount, target) {
  let total = 0
  const totalSelector = document.querySelector('.total')
  const productPrice = Number(target.parentElement.parentElement.children[2].children[0].innerText);
  total = productPrice * amount
  totalSelector.innerHTML = `
    <span class="total currencySymbol">${total}</span>
  `
}


// 監聽器
btnControl.addEventListener('click', handleBtnControlClicked)
standardDeliveryControl.addEventListener('click', handleLabelControlClicked)
dhlDeliveryControl.addEventListener('click', handleLabelControlClicked)
counterControl.forEach((el) => {
  el.addEventListener('click', handleCounterClicked)
})