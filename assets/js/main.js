/**
 * CIAO OPS - Main JavaScript
 * Companhia Teatral Oops!..
 */

(function () {
    'use strict';

    const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ========================================
       DOM Ready
       ======================================== */
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initLoadingScreen();
        initHeader();
        initMobileMenu();
        initSmoothScroll();
        initHeroSwiper();
        initValoresSwiper();
        initEspetaculosSwiper();
        initIntegrantesSwiper();
        initNoticiasSwiper();
        initDepoimentosSwiper();
        initAOS();
        initBackToTop();
        initLazyLoad();
        initGaleriaFilter();
        initLightbox();
        initFormValidation();
        initSiteModal();
        initNewsletterForm();
        initParallax();
        initPhoneMask();
        initIntegranteModal();
        initEventCountdown();
        initEventShare();
        initNoticiasLoadMore();
        initEventosLoadMore();
    }

    /* ========================================
       Loading Screen
       ======================================== */
    function hideLoader() {
        const loader = document.getElementById('loadingScreen');
        if (!loader || loader.classList.contains('hidden')) return;
        loader.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function initLoadingScreen() {
        const loader = document.getElementById('loadingScreen');
        if (!loader) return;

        if (isMobile) {
            hideLoader();
            return;
        }

        document.body.style.overflow = 'hidden';

        window.addEventListener('load', function () {
            setTimeout(hideLoader, 300);
        });

        setTimeout(hideLoader, 1500);
    }

    /* ========================================
       Sticky Header
       ======================================== */
    function initHeader() {
        const header = document.getElementById('siteHeader');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    /* ========================================
       Mobile Menu
       ======================================== */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('mainNav');
        if (!toggle || !nav) return;

        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        function resetMobileSubmenus() {
            nav.querySelectorAll('.nav-item--has-children').forEach(function (item) {
                item.classList.remove('nav-item--open');
                const toggle = item.querySelector(':scope > .nav-item-head .nav-submenu-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        function closeMenu() {
            toggle.classList.remove('active');
            nav.classList.remove('open');
            overlay.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            resetMobileSubmenus();
        }

        function openMenu() {
            toggle.classList.add('active');
            nav.classList.add('open');
            overlay.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        toggle.addEventListener('click', function () {
            if (nav.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);

        nav.querySelectorAll('.nav-submenu-toggle').forEach(function (toggleBtn) {
            toggleBtn.addEventListener('click', function (e) {
                if (window.innerWidth >= 992) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                const item = toggleBtn.closest('.nav-item--has-children');
                if (!item) {
                    return;
                }

                const parentList = item.parentElement;
                const isOpen = item.classList.contains('nav-item--open');

                if (parentList) {
                    parentList.querySelectorAll(':scope > .nav-item--has-children.nav-item--open').forEach(function (sibling) {
                        if (sibling === item) {
                            return;
                        }
                        sibling.classList.remove('nav-item--open');
                        const siblingToggle = sibling.querySelector(':scope > .nav-item-head .nav-submenu-toggle');
                        if (siblingToggle) {
                            siblingToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                }

                item.classList.toggle('nav-item--open', !isOpen);
                toggleBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
            });
        });

        nav.querySelectorAll('.nav-link, .nav-sublink, .btn-nav-cta').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992) {
                    closeMenu();
                }
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 992) {
                closeMenu();
            }
        });
    }

    /* ========================================
       Smooth Scroll
       ======================================== */
    function initSmoothScroll() {
        document.querySelectorAll('.smooth-scroll, a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ========================================
       Hero Swiper
       ======================================== */
    function initHeroSwiper() {
        const heroSection = document.querySelector('.hero-section');
        const heroEl = document.querySelector('.hero-swiper');
        if (!heroEl || typeof Swiper === 'undefined') return;

        const showArrows = !heroSection || heroSection.dataset.heroArrows !== '0';
        const showPagination = !heroSection || heroSection.dataset.heroPagination !== '0';

        new Swiper('.hero-swiper', {
            loop: true,
            speed: isMobile ? 600 : 1000,
            autoplay: isMobile ? false : {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: showPagination ? {
                el: '.hero-pagination',
                clickable: true
            } : false,
            navigation: showArrows ? {
                nextEl: '.hero-next',
                prevEl: '.hero-prev'
            } : false
        });
    }

    /* ========================================
       Section Sliders - Valores, Espetáculos, Integrantes
       ======================================== */
    function createSectionSwiper(selector, prevEl, nextEl, options) {
        const el = document.querySelector(selector);
        if (!el || typeof Swiper === 'undefined') return null;

        return new Swiper(selector, Object.assign({
            speed: 600,
            spaceBetween: 24,
            navigation: {
                nextEl: nextEl,
                prevEl: prevEl
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: options.desktop || 4 }
            }
        }, options.extra || {}));
    }

    function initValoresSwiper() {
        createSectionSwiper('.valores-swiper', '.valores-prev', '.valores-next', { desktop: 4 });
    }

    function initEspetaculosSwiper() {
        createSectionSwiper('.espetaculos-swiper', '.espetaculos-prev', '.espetaculos-next', { desktop: 4 });
    }

    function initIntegrantesSwiper() {
        createSectionSwiper('.integrantes-swiper', '.integrantes-prev', '.integrantes-next', {
            desktop: 5,
            extra: {
                breakpoints: {
                    320: { slidesPerView: 2 },
                    576: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 }
                }
            }
        });

        createSectionSwiper('.integrantes-swiper-sobre', '.integrantes-sobre-prev', '.integrantes-sobre-next', {
            desktop: 4,
            extra: {
                breakpoints: {
                    320: { slidesPerView: 1 },
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 }
                }
            }
        });
    }

    function initNoticiasSwiper() {
        createSectionSwiper('.noticias-swiper', '.noticias-prev', '.noticias-next', { desktop: 3 });
    }

    /* ========================================
       Depoimentos Swiper
       ======================================== */
    function initDepoimentosSwiper() {
        createSectionSwiper('.depoimentos-swiper', '.depoimentos-prev', '.depoimentos-next', { desktop: 4 });
    }

    /* ========================================
       AOS - Animate On Scroll
       ======================================== */
    function initAOS() {
        if (isMobile || prefersReducedMotion) {
            document.querySelectorAll('[data-aos]').forEach(function (el) {
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
                el.removeAttribute('data-aos-duration');
            });
            return;
        }

        if (typeof AOS === 'undefined') return;

        AOS.init({
            duration: 500,
            easing: 'ease-out-cubic',
            once: true,
            offset: 40,
            disable: false
        });
    }

    /* ========================================
       Back to Top
       ======================================== */
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========================================
       Lazy Load Images
       ======================================== */
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img.lazy');

        lazyImages.forEach(function (img) {
            if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            img.decoding = 'async';
        });
    }

    /* ========================================
       Galeria Filter
       ======================================== */
    function initGaleriaFilter() {
        const filters = document.querySelectorAll('.galeria-filter');
        const items = document.querySelectorAll('.galeria-item');

        if (!filters.length || !items.length) return;

        filters.forEach(function (filter) {
            filter.addEventListener('click', function () {
                const category = this.dataset.filter;

                filters.forEach(function (f) { f.classList.remove('active'); });
                this.classList.add('active');

                items.forEach(function (item) {
                    if (category === 'all' || item.dataset.category === category) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.4s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    /* ========================================
       Lightbox
       ======================================== */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const items = document.querySelectorAll('[data-lightbox="galeria"]');

        if (!lightbox || !items.length) return;

        let currentIndex = 0;
        const images = Array.from(items);

        function openLightbox(index) {
            currentIndex = index;
            const item = images[currentIndex];
            lightboxImg.src = item.href;
            lightboxImg.alt = item.dataset.title || '';
            lightboxCaption.textContent = item.dataset.title || '';
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function navigate(direction) {
            currentIndex += direction;
            if (currentIndex < 0) currentIndex = images.length - 1;
            if (currentIndex >= images.length) currentIndex = 0;
            openLightbox(currentIndex);
        }

        items.forEach(function (item, index) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                openLightbox(index);
            });
        });

        lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev')?.addEventListener('click', function () { navigate(-1); });
        lightbox.querySelector('.lightbox-next')?.addEventListener('click', function () { navigate(1); });

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }

    /* ========================================
       Modal Integrante
       ======================================== */
    function initIntegranteModal() {
        const modal = document.getElementById('integranteModal');
        const cards = document.querySelectorAll('.integrante-card-clickable');
        if (!modal || !cards.length) return;

        const foto = document.getElementById('integranteModalFoto');
        const nome = document.getElementById('integranteModalNome');
        const cargo = document.getElementById('integranteModalCargo');
        const desc = document.getElementById('integranteModalDesc');
        const social = document.getElementById('integranteModalSocial');

        function openModal(data) {
            foto.src = data.foto;
            foto.alt = data.nome;
            nome.textContent = data.nome;
            cargo.textContent = data.cargo;
            desc.textContent = data.descricao;

            social.innerHTML = '';
            if (data.social) {
                if (data.social.instagram) {
                    social.innerHTML += '<a href="' + data.social.instagram + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>';
                }
                if (data.social.facebook) {
                    social.innerHTML += '<a href="' + data.social.facebook + '" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>';
                }
                if (data.social.linkedin) {
                    social.innerHTML += '<a href="' + data.social.linkedin + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>';
                }
            }

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            modal.querySelector('.integrante-modal-close').focus();
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        cards.forEach(function (card) {
            card.addEventListener('click', function (e) {
                if (e.target.closest('.integrante-social-link')) return;

                try {
                    const data = JSON.parse(card.dataset.integrante);
                    openModal(data);
                } catch (err) {
                    console.error('Erro ao abrir modal do integrante:', err);
                }
            });

            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (e.target.closest('.integrante-social-link')) return;
                    card.click();
                }
            });
        });

        modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
            el.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    /* ========================================
       Form Validation
       ======================================== */
    function initFormValidation() {
        const form = document.getElementById('contatoForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }

            form.classList.add('was-validated');
        });

        const emailInput = form.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('input', function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.setCustomValidity('Informe um e-mail válido.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
    }

    /* ========================================
       Newsletter Form
       ======================================== */
    function initNewsletterForm() {
        const forms = document.querySelectorAll('.newsletter-form');
        if (!forms.length) return;

        forms.forEach(function (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const emailInput = form.querySelector('input[name="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const apiUrl = form.dataset.api || 'api/newsletter.php';

            if (!emailInput || !emailInput.value || !submitBtn) return;
            if (submitBtn.disabled) return;

            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

            try {
                const formData = new FormData();
                formData.append('email', emailInput.value.trim());

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                const data = await response.json();

                if (data.success) {
                    showSiteModal(data.message || 'Obrigado! Você foi cadastrado na nossa newsletter.', 'success');
                    form.reset();
                } else {
                    showSiteModal(data.message || 'Não foi possível concluir o cadastro.', 'error');
                }
            } catch (err) {
                showSiteModal('Erro ao cadastrar. Verifique sua conexão e tente novamente.', 'error');
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        });
        });
    }

    /* ========================================
       Modal centralizado (feedback)
       ======================================== */
    function initSiteModal() {
        const modal = document.getElementById('siteModal');
        if (!modal) return;

        modal.querySelectorAll('[data-close-site-modal]').forEach(function (el) {
            el.addEventListener('click', closeSiteModal);
        });

        document.getElementById('siteModalBtn')?.addEventListener('click', closeSiteModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeSiteModal();
            }
        });
    }

    function showSiteModal(message, type) {
        const modal = document.getElementById('siteModal');
        const iconWrap = document.getElementById('siteModalIcon');
        const title = document.getElementById('siteModalTitle');
        const messageEl = document.getElementById('siteModalMessage');

        if (!modal || !iconWrap || !title || !messageEl) return;

        const isSuccess = type !== 'error';
        iconWrap.className = 'site-modal-icon ' + (isSuccess ? 'success' : 'error');
        iconWrap.innerHTML = isSuccess
            ? '<i class="fa-solid fa-circle-check"></i>'
            : '<i class="fa-solid fa-circle-exclamation"></i>';
        title.textContent = isSuccess ? 'Cadastro realizado!' : 'Não foi possível cadastrar';
        messageEl.textContent = message;

        modal.classList.add('active');
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            document.getElementById('siteModalBtn')?.focus();
        }, 100);
    }

    function closeSiteModal() {
        const modal = document.getElementById('siteModal');
        if (!modal) return;

        modal.classList.remove('active');
        modal.setAttribute('hidden', '');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ========================================
       Parallax Effect
       ======================================== */
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length || isMobile || prefersReducedMotion) return;

        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(function (el) {
                const speed = parseFloat(el.dataset.parallax) || 0.3;
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.style.transform = 'translateY(' + (scrolled * speed * 0.1) + 'px)';
                }
            });
        }, { passive: true });
    }

    /* ========================================
       Phone Mask
       ======================================== */
    function initPhoneMask() {
        const phoneInput = document.getElementById('telefone');
        if (!phoneInput) return;

        function getDigits(value) {
            return (value || '').replace(/\D/g, '');
        }

        function formatPhone(digits) {
            if (digits.length > 11) {
                digits = digits.slice(0, 11);
            }

            if (digits.length > 6) {
                return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
            }
            if (digits.length > 2) {
                return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
            }
            if (digits.length > 0) {
                return '(' + digits;
            }

            return '';
        }

        function syncPhoneState() {
            const digits = getDigits(phoneInput.value);

            if (digits.length === 0) {
                phoneInput.value = '';
                phoneInput.setCustomValidity('Por favor, informe seu telefone.');
                return;
            }

            if (digits.length < 10) {
                phoneInput.setCustomValidity('Por favor, informe um telefone válido com DDD.');
            } else {
                phoneInput.setCustomValidity('');
            }
        }

        phoneInput.addEventListener('input', function () {
            this.value = formatPhone(getDigits(this.value));
            syncPhoneState();
        });

        phoneInput.addEventListener('blur', syncPhoneState);

        const form = phoneInput.closest('form');
        if (form) {
            form.addEventListener('submit', syncPhoneState, true);
        }

        if (phoneInput.value) {
            phoneInput.value = formatPhone(getDigits(phoneInput.value));
        }
        syncPhoneState();
    }

    function initEventCountdown() {
        const wrap = document.querySelector('.event-countdown[data-target]');
        if (!wrap) return;

        const targetMs = parseInt(wrap.dataset.target, 10) * 1000;
        if (!targetMs || Number.isNaN(targetMs)) return;

        const units = {
            days: wrap.querySelector('[data-unit="days"]'),
            hours: wrap.querySelector('[data-unit="hours"]'),
            minutes: wrap.querySelector('[data-unit="minutes"]'),
            seconds: wrap.querySelector('[data-unit="seconds"]'),
        };

        function tick() {
            const diff = targetMs - Date.now();
            if (diff <= 0) {
                Object.values(units).forEach((el) => { if (el) el.textContent = '0'; });
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            if (units.days) units.days.textContent = String(days);
            if (units.hours) units.hours.textContent = String(hours).padStart(2, '0');
            if (units.minutes) units.minutes.textContent = String(minutes).padStart(2, '0');
            if (units.seconds) units.seconds.textContent = String(seconds).padStart(2, '0');
        }

        tick();
        window.setInterval(tick, 1000);
    }

    function initEventShare() {
        document.querySelectorAll('.event-share-copy').forEach((btn) => {
            btn.addEventListener('click', async function () {
                const url = this.dataset.url || window.location.href;
                try {
                    await navigator.clipboard.writeText(url);
                    const original = this.innerHTML;
                    this.innerHTML = '<i class="fa-solid fa-check"></i> Link copiado';
                    window.setTimeout(() => { this.innerHTML = original; }, 2000);
                } catch (e) {
                    window.prompt('Copie o link do evento:', url);
                }
            });
        });
    }

    function initNoticiasLoadMore() {
        initLoadMoreButton('noticiasLoadMore', 'noticiasGrid', '.noticias-grid-item--hidden');
    }

    function initEventosLoadMore() {
        initLoadMoreButton('eventosLoadMore', 'eventosLista', '.eventos-lista-item--hidden');
    }

    function initLoadMoreButton(buttonId, containerId, hiddenSelector) {
        const btn = document.getElementById(buttonId);
        const container = document.getElementById(containerId);
        if (!btn || !container) return;

        const perPage = parseInt(btn.dataset.perPage, 10) || 6;

        btn.addEventListener('click', function () {
            const hiddenItems = container.querySelectorAll(hiddenSelector);
            const batch = Array.from(hiddenItems).slice(0, perPage);

            batch.forEach(function (item) {
                item.classList.remove(hiddenSelector.replace('.', ''), 'd-none');
            });

            if (typeof AOS !== 'undefined') {
                AOS.refreshHard();
            }

            if (container.querySelectorAll(hiddenSelector).length === 0) {
                btn.closest('.text-center')?.remove();
            }
        });
    }


    /* Static export: formulários sem backend PHP */
    if (document.body && document.body.dataset.staticSite === '1') {
        document.querySelectorAll('[data-static-form="newsletter"]').forEach(function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                showSiteModal('Versão estática: cadastro disponível apenas no site com CMS.', 'info');
            });
        });
        const contatoForm = document.getElementById('contatoForm');
        if (contatoForm) {
            contatoForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!contatoForm.checkValidity()) {
                    contatoForm.classList.add('was-validated');
                    return;
                }
                showSiteModal('Versão estática: envio disponível apenas no site com CMS.', 'info');
            });
        }
    }
})();
