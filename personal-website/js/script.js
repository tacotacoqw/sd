// 页面加载动画
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 500);
});

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 滚动动画
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查

    // 图片加载动画
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        // 如果图片已经缓存
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 简单表单验证
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('请填写所有必填字段');
                return;
            }

            // 模拟表单提交
            const submitButton = contactForm.querySelector('.btn');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = '发送中...';

            setTimeout(function() {
                alert('留言发送成功！感谢您的联系。');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // 登录表单处理
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            if (!usernameInput.value || !passwordInput.value) {
                alert('请输入用户名和密码');
                return;
            }

            // 模拟登录过程
            const loginButton = loginForm.querySelector('.login-btn');
            const originalText = loginButton.textContent;

            loginButton.disabled = true;
            loginButton.textContent = '登录中...';

            setTimeout(function() {
                alert('登录成功！欢迎回来。');
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // 社交登录按钮处理 - 跳转到各平台官方登录页面
    const socialButtons = document.querySelectorAll('.social-btn');

    // 各平台完整OAuth登录URL（需替换为您的实际应用参数）
    const loginUrls = {
        // 微信登录：在微信开放平台(https://open.weixin.qq.com)注册获取APPID
        weixin: 'https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APPID&redirect_uri=https%3A%2F%2Fyourdomain.com%2Flogin%2Fwechat&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect',
        // QQ登录：在QQ互联平台(https://connect.qq.com)注册获取APPID
        qq: 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=YOUR_QQ_APPID&redirect_uri=https%3A%2F%2Fyourdomain.com%2Flogin%2Fqq&state=STATE',
        netease: 'https://mail.163.com/js6/main.jsp'
    };

    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList[1];
            const url = loginUrls[platform];
            const buttonText = this.textContent.trim();

            if (url) {
                // 检测是否使用默认占位符APPID
                if (url.includes('YOUR_APPID') || url.includes('YOUR_QQ_APPID')) {
                    alert(`⚠️ ${buttonText}登录尚未配置

请先在${platform === 'weixin' ? '微信开放平台' : 'QQ互联平台'}注册应用，获取APPID并替换代码中的YOUR_APPID占位符。

注册地址：${platform === 'weixin' ? 'https://open.weixin.qq.com' : 'https://connect.qq.com'}`);
                    return;
                }

                // 尝试打开登录窗口
                const loginWindow = window.open(url, '_blank', 'width=800,height=600');

                // 检查窗口是否被浏览器阻止
                if (!loginWindow) {
                    alert(`⚠️ ${buttonText}登录窗口被浏览器阻止，请允许弹出窗口后重试`);
                } else {
                    // 监听窗口关闭事件（实际应用中可用于检测登录状态）
                    const checkLogin = setInterval(() => {
                        if (loginWindow.closed) {
                            clearInterval(checkLogin);
                            // location.reload(); // 可选：登录成功后刷新页面
                        }
                    }, 1000);
                }
            }
        });
    })

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.style.padding = '10px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.backgroundColor = 'var(--white-color)';
            }

            lastScrollTop = scrollTop;
        });
    }
});