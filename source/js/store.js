let allProducts=[
    {id:1,title:'Album1',price:10, img:'Images/Album 1.png',count:1},
    {id:2,title:'Album2',price:15.65, img:'Images/Album 2.png',count:1},
    {id:3,title:'Album3',price:14.5, img:'Images/Album 3.png',count:1},
    {id:4,title:'Album4',price:8.74, img:'Images/Album 4.png',count:1},
    {id:5,title:'Coffee',price:38, img:'Images/Cofee.png',count:1},
    {id:6,title:'Shirt',price:55.87, img:'Images/Shirt.png',count:1},
]
let $=document
let userBasket=[]

const basketProcutsItems=$.querySelector('.cart-items')
const clearBasketElem=$.getElementById('clearBasket')
const productsContainer=$.querySelector('.shop-items')
const totalPrice=$.querySelector('#totalPrice')

let productsFragment=$.createDocumentFragment()

allProducts.forEach(function(product){

    let productContainer=$.createElement('div')
    productContainer.classList.add('shop-item')

    let productTitleSpan=$.createElement('span')
    productTitleSpan.classList.add('shop-item-title')
    productTitleSpan.innerHTML=product.title

    let productImage=$.createElement('img')
    productImage.classList.add('shop-item-image')
    productImage.setAttribute('src',product.img)


let productDetailsContainer=$.createElement('div')
productDetailsContainer.classList.add('shop-item-details')

let productPriceSpan=$.createElement('span')
productPriceSpan.classList.add('shop-item-price')
productPriceSpan.innerHTML=product.price+'$'

let productAddButton=$.createElement('button')
productAddButton.className='btn btn-primary shop-item-button' //more than one class we have to use<<className>>
productAddButton.innerHTML='ADD TO CART'
productAddButton.addEventListener('click',function(){
    addProductToBasketArray(product.id)
})


productDetailsContainer.append(productPriceSpan,productAddButton)
productContainer.append(productTitleSpan,productImage,productDetailsContainer)

// productsContainer.append(productContainer)  commented to refactore by fragment
productsFragment.append(productContainer)

})

productsContainer.append(productsFragment) 



function addProductToBasketArray(productId){

let mainProduct=allProducts.find(function(product){
    return product.id===productId
})
userBasket.push(mainProduct)
basketProductGenerator(userBasket)
calcTotalPrice(userBasket)

// console.log(userBasket)

}



let basketProductsFragment=$.createDocumentFragment()

function basketProductGenerator(userBasketArray){  // create to dom
    basketProcutsItems.innerHTML=''


userBasketArray.forEach(function(product){


    let basketProductContainer=$.createElement('div')
    basketProductContainer.classList.add('cart-row')

    let basketProductDetailsContainer=$.createElement('div')
    basketProductDetailsContainer.className='cart-item cart-column'
    
    let basketProductImg=$.createElement('img')
    basketProductImg.classList.add('cart-item-image')//clss list=== changed
    basketProductImg.setAttribute('src',product.img)
    basketProductImg.setAttribute('width','100')
    basketProductImg.setAttribute('height','100')

    let basketTitleSpan=$.createElement('span')
    basketTitleSpan.classList.add('cart-item-title')
    basketTitleSpan.innerHTML=product.title

 basketProductDetailsContainer.append(basketProductImg,basketTitleSpan)

let basketPriceSpan=$.createElement('span')
basketPriceSpan.className='cart-price cart-column'
basketPriceSpan.innerHTML=product.price+'$'


let basketInputContainer=$.createElement('div')
basketInputContainer.className='cart-quantity cart-column'

let basketProductInput=$.createElement('input')
basketProductInput.classList.add('cart-quantity-input')//classname===
basketProductInput.value=product.count
basketProductInput.setAttribute('type','number')
basketProductInput.addEventListener('change',function(){
    updateProductCount(product.id,basketProductInput.value)
})

let basketProductInputRemoveButton=$.createElement('button')
basketProductInputRemoveButton.className='btn btn-danger'
basketProductInputRemoveButton.innerHTML='REMOVE'
basketProductInputRemoveButton.addEventListener('click',function(){
    removeProductFromBasket(product.id)
})


basketInputContainer.append(basketProductInput,basketProductInputRemoveButton)


basketProductContainer.append(basketProductDetailsContainer,basketPriceSpan,basketInputContainer)


// basketProcutsItems.append(basketProductContainer)  refactoring to use fragment
basketProductsFragment.append(basketProductContainer)
})


basketProcutsItems.append(basketProductsFragment)

}

function removeProductFromBasket(productId){

userBasket=userBasket.filter(function(product){ // اگر متغییر جدید بسازیم هربار که پاک میکنه (فیلتر) قبلی رو نمایش میدهد
   return product.id!==productId // اون محصولاتی که ایدی شان مخالف ایدی ورودی هست را نشان می دهد
})
basketProductGenerator(userBasket)
calcTotalPrice(userBasket)
// console.log(newBasket)

}

clearBasketElem.addEventListener('click',function(){

    userBasket=[]// سبد ارایه اش رو خالی میکنه
    basketProductGenerator(userBasket) // ارایه خالی را میسازد و در دام نشان می دهد
    calcTotalPrice(userBasket)
})



function calcTotalPrice(userBasketArray){
let totalPriceValue=0
    userBasketArray.forEach(function(prodcut){
        totalPriceValue += prodcut.price*prodcut.count

    })
    totalPrice.innerHTML=totalPriceValue+'$'



}

function updateProductCount(prodcutId,newCountValue){
// console.log('prodcutId '+ prodcutId + 'newCountValue=' + newCountValue)

userBasket.forEach(function(prodcut){
    if(prodcut.id===prodcutId){
        prodcut.count=newCountValue
    }

})
calcTotalPrice(userBasket)


}

