// مدیریت لاگین

document.getElementById('loginForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const username = document.getElementById('username').value;

    const password = document.getElementById('password').value;

    // بررسی اعتبار لاگین (می‌توانید با دیتابیس یا API چک کنید)

    if (username === 'user' && password === 'pass') {

        window.location.href = 'form.html';

    } else {

        alert('نام کاربری یا رمز عبور اشتباه است');

    }

});

// مدیریت فرم اطلاعات

document.getElementById('infoForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const name = document.getElementById('name').value;

    const email = document.getElementById('email').value;

    const phone = document.getElementById('phone').value;

    // ذخیره اطلاعات در localStorage

    const userInfo = { name, email, phone };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    alert('اطلاعات با موفقیت ذخیره شد');

});
