var trash = document.getElementsByClassName("fa-trash");
let units = document.getElementsByClassName('unitSubmit')


Array.from(units).forEach(function(element) {
  element.addEventListener('click', function(){
    const item = this.parentNode.parentNode.childNodes[1].innerText
    const units = this.parentNode.childNodes[1].value
    console.log(units, item)
    fetch('/inventory', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'items': item,
        'quantity' : units,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const item = this.parentNode.parentNode.childNodes[1].innerText
        const price = this.parentNode.parentNode.childNodes[3].innerText
        console.log(this.parentNode.parentNode.childNodes)
        fetch('/inventory', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'items': item,
            'price': price
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
