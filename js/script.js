document.getElementById('loginForm').addEventListener('submit', function(event) {
       event.preventDefault();
       const username = document.getElementById('Test').value;
       const password = document.getElementById('1234').value;
       // ارسال اطلاعات به سرور برای بررسی
       fetch('/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ username, password })
       }).then(response => response.json())
         .then(data => {
             if (data.success) {
                 window.location.href = '/pages/dashboard.html';
             } else {
                 alert('نام کاربری یا رمز عبور اشتباه است');
             }
         });
   });

   document.getElementById('dataForm').addEventListener('submit', function(event) {
       event.preventDefault();
       const data = document.getElementById('dataInput').value;
       // ارسال اطلاعات جدید به سرور
       fetch('/saveData', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ data })
       }).then(response => response.json())
         .then(data => {
             if (data.success) {
                 loadData();
             }
         });
   });

   function loadData() {
       // دریافت اطلاعات از سرور
       fetch('/getData')
           .then(response => response.json())
           .then(data => {
               const dataList = document.getElementById('dataList');
               dataList.innerHTML = '';
               data.forEach(item => {
                   const li = document.createElement('li');
                   li.textContent = item;
                   dataList.appendChild(li);
               });
           });
   }

   document.getElementById('searchInput').addEventListener('input', function(event) {
       const query = event.target.value;
       // جستجو در اطلاعات
       fetch(`/search?q=${query}`)
           .then(response => response.json())
           .then(data => {
               const dataList = document.getElementById('dataList');
               dataList.innerHTML = '';
               data.forEach(item => {
                   const li = document.createElement('li');
                   li.textContent = item;
                   dataList.appendChild(li);
               });
           });
   });

   loadData();
