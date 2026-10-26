const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
const grid = document.getElementById('projects-grid');

// All service content, including editable TODO_CONFIRM prices and delivery windows, lives in data/services.js.
const serviceGrid = document.getElementById('services-grid');
if (serviceGrid && Array.isArray(window.SERVICES)) {
    const iconTemplate = document.getElementById('service-icon-library');
    window.SERVICES.forEach(service => {
        const card = document.createElement('article');
        card.className = 'service-card';
        card.setAttribute('role', 'listitem');
        const icon = iconTemplate?.content.querySelector(`[data-icon="${service.icon}"]`)?.cloneNode(true);
        if (icon) { const wrap = document.createElement('div'); wrap.className = 'service-icon'; wrap.appendChild(icon); card.appendChild(wrap); }
        const title = document.createElement('h3'); title.textContent = service.title;
        const benefit = document.createElement('p'); benefit.className = 'service-benefit'; benefit.textContent = service.benefit;
        const quote = document.createElement('a'); quote.className = 'service-quote'; quote.href = '#contact'; quote.dataset.projectType = service.projectType; quote.textContent = 'Get a quote';
        card.append(title, benefit, quote); serviceGrid.appendChild(card);
    });
}

// Inject configured facts, social links, FAQ and testimonials from the shared content object.
const site = window.SITE_CONTENT || {};
const draftInfo = site.about?.draftDelivery;
if (draftInfo?.confirmed && draftInfo.value) {
    const draft = document.querySelector('[data-about-draft]');
    if (draft) { draft.textContent = ` within ${draftInfo.value}`; draft.hidden = false; }
}
const revisionInfo = site.about?.revisions;
if (revisionInfo?.confirmed && revisionInfo.value) {
    const revisionRow = document.querySelector('[data-about-revisions-row]');
    const revisionValue = document.querySelector('[data-about-revisions]');
    if (revisionRow && revisionValue) { revisionValue.textContent = revisionInfo.value; revisionRow.hidden = false; }
}
const stats = site.about?.stats;
if (stats?.visible && Number.isFinite(stats.projectsCompleted) && Number.isFinite(stats.averageDelivery)) {
    const statsList = document.getElementById('about-stats');
    if (statsList) {
        statsList.hidden = false;
        [['Projects completed', stats.projectsCompleted], ['Average delivery', stats.averageDelivery]].forEach(([label, value]) => {
            const item = document.createElement('div'); const term = document.createElement('dt'); const detail = document.createElement('dd');
            term.textContent = label; detail.textContent = value; item.append(term, detail); statsList.appendChild(item);
        });
    }
}
const faqList = document.getElementById('faq-list');
(site.faq || []).forEach((item, index) => {
    const details = document.createElement('details'); details.className = 'faq-item';
    const summary = document.createElement('summary'); summary.textContent = item.question;
    const answer = document.createElement('p'); answer.textContent = item.answer;
    details.append(summary, answer); faqList?.appendChild(details);
});
const testimonials = Array.isArray(site.testimonials) ? site.testimonials.filter(item => item.quote && item.name) : [];
const testimonialSection = document.getElementById('testimonials');
if (testimonials.length && testimonialSection) {
    testimonialSection.hidden = false;
    const list = document.getElementById('testimonials-list');
    testimonials.forEach(item => { const quote = document.createElement('blockquote'); quote.className = 'testimonial'; const body = document.createElement('p'); body.textContent = item.quote; const name = document.createElement('cite'); name.textContent = item.name; quote.append(body, name); list.appendChild(quote); });
}
const contactContent = site.contact || {};
document.querySelectorAll('[data-contact="email"]').forEach(link => {
    if (contactContent.email) { link.href = `mailto:${contactContent.email}`; link.textContent = contactContent.email; }
    if (link.hasAttribute('data-copy')) link.dataset.copy = contactContent.email || '';
});
document.querySelectorAll('[data-contact="phone"]').forEach(link => {
    if (contactContent.phone) { link.href = `tel:${contactContent.phone.replace(/[\s()-]/g, '')}`; link.textContent = contactContent.phone; }
});
const linkedIn = document.getElementById('linkedin-item');
if (contactContent.linkedinUrl && /^https:\/\/([\w-]+\.)?linkedin\.com\//i.test(contactContent.linkedinUrl) && linkedIn) {
    const link = linkedIn.querySelector('a'); link.href = contactContent.linkedinUrl; link.textContent = new URL(contactContent.linkedinUrl).hostname + new URL(contactContent.linkedinUrl).pathname; linkedIn.hidden = false;
}
document.querySelectorAll('[data-social]').forEach(link => { const url = contactContent[`${link.dataset.social}Url`]; if (url && /^https:\/\//i.test(url)) { link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.hidden = false; } });
document.querySelectorAll('[data-chat]').forEach(link => {
    if (link.dataset.chat === 'telegram') {
        const username = (contactContent.telegramUsername || '').trim().replace(/^@/, '');
        if (/^[A-Za-z0-9_]{5,32}$/.test(username)) {
            link.href = `https://t.me/${encodeURIComponent(username)}`;
            link.hidden = false;
        }
    }
    if (link.dataset.chat === 'whatsapp') {
        const number = (contactContent.whatsappNumber || '').replace(/\D/g, '');
        if (number) {
            const message = encodeURIComponent(contactContent.whatsappPrefill || '');
            link.href = `https://wa.me/${number}${message ? `?text=${message}` : ''}`;
            link.hidden = false;
        }
    }
});
const floatingWhatsApp = document.querySelector('.whatsapp-float');
const contactForm = document.getElementById('contactForm');
if (floatingWhatsApp && contactForm && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
        floatingWhatsApp.hidden = entry.isIntersecting || !contactContent.whatsappNumber;
    }, { threshold: 0.05 }).observe(contactForm);
}

function makeProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.project = project.id;
    card.dataset.category = project.category;
    card.dataset.featured = String(Boolean(project.featured));

    const imageFrame = document.createElement('div');
    imageFrame.className = 'project-image';
    const picture = document.createElement('picture');
    const webp = document.createElement('source');
    webp.type = 'image/webp'; webp.srcset = project.image.replace(/\.jpg$/i, '.webp');
    picture.appendChild(webp);
    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.imageAlt || `Graphic design: ${project.title}`;
    image.width = project.width || 1200; image.height = project.height || 900;
    image.loading = 'lazy';
    image.decoding = 'async';
    picture.appendChild(image); imageFrame.appendChild(picture);

    const details = document.createElement('div');
    details.className = 'project-info';
    const badges = document.createElement('div');
    badges.className = 'project-badges';
    const typeBadge = document.createElement('span');
    typeBadge.className = `project-type-badge project-type-badge--${project.type}`;
    typeBadge.textContent = project.type === 'client' ? 'Client Project' : 'Concept Project';
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'project-category-badge';
    categoryBadge.textContent = project.category;
    badges.append(typeBadge, categoryBadge);

    const title = document.createElement('h3');
    title.textContent = project.title;
    const description = document.createElement('p');
    description.className = 'muted';
    description.textContent = project.shortDescription;
    const actions = document.createElement('div');
    actions.className = 'project-actions';
    const viewButton = document.createElement('button');
    viewButton.className = 'btn btn-primary view-project';
    viewButton.type = 'button';
    viewButton.dataset.projectView = project.id;
    viewButton.textContent = project.caseStudyPage ? 'View Case Study' : 'View Project';
    actions.appendChild(viewButton);
    details.append(badges, title, description, actions);
    card.append(imageFrame, details);
    return card;
}

const visibleProjects = projects.filter(project => project.visible !== false);
if (grid) grid.replaceChildren(...visibleProjects.map(makeProjectCard));

// Filtering uses native buttons, so Tab, Enter and Space remain available.
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
function applyProjectFilter(category) {
    filterButtons.forEach(button => {
        const active = button.dataset.filter === category;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project-card').forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        if (matches) {
            card.hidden = false;
            card.setAttribute('aria-hidden', 'false');
            requestAnimationFrame(() => card.classList.remove('is-filtered-out'));
            card.querySelectorAll('button').forEach(button => { button.tabIndex = 0; });
        } else {
            card.classList.add('is-filtered-out');
            card.setAttribute('aria-hidden', 'true');
            card.querySelectorAll('button').forEach(button => { button.tabIndex = -1; });
            const hideAfterFade = () => {
                if (card.classList.contains('is-filtered-out')) card.hidden = true;
            };
            card.addEventListener('transitionend', hideAfterFade, { once: true });
            window.setTimeout(hideAfterFade, 300);
        }
    });
}
filterButtons.forEach((button, index) => {
    button.addEventListener('click', () => applyProjectFilter(button.dataset.filter));
    button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? filterButtons.length - 1
            : (index + (event.key === 'ArrowRight' ? 1 : -1) + filterButtons.length) % filterButtons.length;
        filterButtons[next].focus();
    });
});

// Project image lightbox with per-project galleries and keyboard controls.
if (visibleProjects.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-labelledby', 'image-lightbox-title');
    lightbox.innerHTML = `
        <div class="image-lightbox__backdrop" data-lightbox-close></div>
        <button class="image-lightbox__button image-lightbox__close" type="button" aria-label="Close image">×</button>
        <div class="image-lightbox__zoom-controls" aria-label="Image zoom controls">
            <button class="image-lightbox__button" type="button" data-zoom="out" aria-label="Zoom out">−</button>
            <button class="image-lightbox__button" type="button" data-zoom="in" aria-label="Zoom in">+</button>
            <button class="image-lightbox__button image-lightbox__zoom-reset" type="button" data-zoom="reset" aria-label="Reset zoom">Reset</button>
        </div>
        <button class="image-lightbox__button image-lightbox__previous" type="button" aria-label="Previous image">‹</button>
        <div class="image-lightbox__image-wrap"><picture><source class="image-lightbox__webp" type="image/webp"><img class="image-lightbox__image" alt="" width="1200" height="900"></picture></div>
        <button class="image-lightbox__button image-lightbox__next" type="button" aria-label="Next image">›</button>
        <h2 class="image-lightbox__title" id="image-lightbox-title"></h2>`;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.image-lightbox__image');
    const imageWrap = lightbox.querySelector('.image-lightbox__image-wrap');
    const lightboxWebp = lightbox.querySelector('.image-lightbox__webp');
    const lightboxTitle = lightbox.querySelector('.image-lightbox__title');
    const closeButton = lightbox.querySelector('.image-lightbox__close');
    const previousButton = lightbox.querySelector('.image-lightbox__previous');
    const nextButton = lightbox.querySelector('.image-lightbox__next');
    const zoomControls = lightbox.querySelector('.image-lightbox__zoom-controls');
    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    let activeProjectIndex = 0;
    let activeImageIndex = 0;
    let focusReturn = null;
    let savedOverflow = '';

    function projectGallery() {
        const project = visibleProjects[activeProjectIndex];
        return project.images?.length ? project.images : [project.image];
    }
    function showImage(index) {
        const gallery = projectGallery();
        activeImageIndex = (index + gallery.length) % gallery.length;
        const project = visibleProjects[activeProjectIndex];
        lightboxWebp.srcset = gallery[activeImageIndex].replace(/\.jpg$/i, '.webp');
        lightboxImage.src = gallery[activeImageIndex];
        lightboxImage.alt = project.title;
        lightboxTitle.textContent = gallery.length > 1 ? `${project.title} · ${activeImageIndex + 1} of ${gallery.length}` : project.title;
        setZoom(1);
    }
    function setZoom(level) {
        zoomLevel = Math.max(1, Math.min(4, level));
        if (zoomLevel === 1) panX = panY = 0;
        lightboxImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
        lightboxImage.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
        zoomControls.querySelector('[data-zoom="out"]').disabled = zoomLevel <= 1;
        zoomControls.querySelector('[data-zoom="in"]').disabled = zoomLevel >= 4;
    }
    function openLightbox(projectId, trigger) {
        const index = visibleProjects.findIndex(project => project.id === projectId);
        if (index < 0) return;
        activeProjectIndex = index;
        focusReturn = trigger;
        showImage(0);
        savedOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        lightbox.hidden = false;
        closeButton.focus();
    }
    function closeLightbox() {
        if (lightbox.hidden) return;
        lightbox.hidden = true;
        lightboxImage.removeAttribute('src');
        document.body.style.overflow = savedOverflow;
        if (focusReturn?.isConnected) focusReturn.focus();
    }
    function stepProject(direction) {
        activeProjectIndex = (activeProjectIndex + direction + visibleProjects.length) % visibleProjects.length;
        showImage(0);
    }
    function stepImage(direction) {
        const gallery = projectGallery();
        const next = activeImageIndex + direction;
        if (next >= 0 && next < gallery.length) showImage(next);
        else stepProject(direction);
    }

    document.querySelectorAll('.project-card').forEach(card => {
        const project = visibleProjects.find(item => item.id === card.dataset.project);
        if (!project) return;
        const viewButton = document.createElement('button');
        viewButton.className = 'project-view-image';
        viewButton.type = 'button';
        viewButton.setAttribute('aria-label', `View full image: ${project.title}`);
        viewButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><span>View</span>';
        card.querySelector('.project-image').appendChild(viewButton);
        viewButton.addEventListener('click', event => {
            event.stopPropagation();
            openLightbox(project.id, viewButton);
        });
        card.querySelector('.view-project').addEventListener('click', event => {
            event.stopPropagation();
            openLightbox(project.id, event.currentTarget);
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    previousButton.addEventListener('click', () => stepImage(-1));
    nextButton.addEventListener('click', () => stepImage(1));
    zoomControls.addEventListener('click', event => {
        const action = event.target.closest('[data-zoom]')?.dataset.zoom;
        if (action === 'in') setZoom(zoomLevel + 0.5);
        if (action === 'out') setZoom(zoomLevel - 0.5);
        if (action === 'reset') setZoom(1);
    });
    lightboxImage.addEventListener('click', () => setZoom(zoomLevel === 1 ? 2 : 1));
    imageWrap.addEventListener('wheel', event => {
        if (lightbox.hidden) return;
        if (event.ctrlKey) {
            event.preventDefault();
            setZoom(zoomLevel + (event.deltaY < 0 ? 0.25 : -0.25));
            return;
        }
        if (zoomLevel <= 1) return;
        event.preventDefault();
        panY -= event.deltaY;
        lightboxImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    }, { passive: false });
    let dragStart = null;
    let didPan = false;
    lightboxImage.addEventListener('pointerdown', event => {
        if (zoomLevel <= 1) return;
        didPan = false;
        dragStart = { x: event.clientX - panX, y: event.clientY - panY };
        lightboxImage.setPointerCapture(event.pointerId);
        lightboxImage.style.cursor = 'grabbing';
    });
    lightboxImage.addEventListener('pointermove', event => {
        if (!dragStart) return;
        if (Math.abs(event.clientX - dragStart.x - panX) + Math.abs(event.clientY - dragStart.y - panY) > 3) didPan = true;
        panX = event.clientX - dragStart.x;
        panY = event.clientY - dragStart.y;
        lightboxImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    });
    lightboxImage.addEventListener('pointerup', () => { dragStart = null; lightboxImage.style.cursor = 'grab'; });
    lightboxImage.addEventListener('click', event => {
        if (!didPan) return;
        event.stopImmediatePropagation();
        didPan = false;
    }, true);
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox || event.target.hasAttribute('data-lightbox-close')) closeLightbox();
    });
    lightbox.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
            const controls = [closeButton, previousButton, nextButton];
            if (event.shiftKey && document.activeElement === controls[0]) {
                event.preventDefault();
                controls[controls.length - 1].focus();
            } else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) {
                event.preventDefault();
                controls[0].focus();
            }
        } else if (event.key === 'Escape') closeLightbox();
        else if (event.key === 'ArrowLeft') stepImage(-1);
        else if (event.key === 'ArrowRight') stepImage(1);
    });
}

// Featured artwork showcase. Images load only when the strip approaches the viewport.
const showcase = document.getElementById('hero-showcase');
const featuredProjects = visibleProjects.filter(project => project.featured).slice(0, 4);
if (showcase && featuredProjects.length) {
    const track = document.createElement('div');
    track.className = 'hero-showcase__track';
    featuredProjects.forEach(project => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'hero-showcase__item';
        item.setAttribute('aria-label', `View featured project: ${project.title}`);
        const picture = document.createElement('picture');
        const webp = document.createElement('source'); webp.type = 'image/webp'; webp.srcset = project.image.replace(/\.jpg$/i, '.webp'); picture.appendChild(webp);
        const image = document.createElement('img');
        image.src = project.image;
        image.width = project.width || 1200; image.height = project.height || 900;
        image.alt = '';
        image.loading = 'eager';
        image.decoding = 'async';
        picture.appendChild(image);
        const label = document.createElement('span');
        label.textContent = project.title;
        item.append(picture, label);
        item.addEventListener('click', () => document.querySelector(`[data-project-view="${project.id}"]`)?.click());
        track.appendChild(item);
    });
    showcase.appendChild(track);
}

// Existing contact form, navigation, and page animations.
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        const closeMenu = () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation');
        };
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
            hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        });
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                hamburger.focus();
            }
        });
    }

    const header = document.querySelector('.header');
    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    const sections = Array.from(document.querySelectorAll('section[id]'));
    const updateActiveNavigation = () => {
        const marker = window.scrollY + (header?.getBoundingClientRect().height || 76) + 8;
        let current = sections[0]?.id || '';
        sections.forEach(section => {
            if (section.getBoundingClientRect().top + window.scrollY <= marker) current = section.id;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            const active = link.hash === `#${current}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
    window.addEventListener('resize', updateActiveNavigation);
    updateActiveNavigation();

    const form = document.getElementById('contactForm');
    document.querySelectorAll('.service-quote').forEach(link => link.addEventListener('click', () => {
        const typeSelect = document.getElementById('project-type');
        if (typeSelect) typeSelect.value = link.dataset.projectType;
    }));
    form?.addEventListener('submit', async event => {
        event.preventDefault();
        const message = document.getElementById('formMessage');
        message.textContent = '';
        message.className = 'form-message';
        if (!form.reportValidity()) return;
        if (form.elements._gotcha.value) return;
        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton.disabled) return;
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = 'Sending…';
        message.textContent = 'Sending message...';
        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            if (!response.ok) throw new Error('Your message could not be sent. Please try again.');
            message.classList.add('success');
            message.textContent = 'Thank you! Your message has been sent.';
            form.reset();
        } catch (error) {
            message.classList.add('error');
            message.textContent = error.message || 'Sorry, there was an error sending your message. Please try again.';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText;
        }
    });

    const emailLink = document.querySelector('.contact-link[data-copy]');
    emailLink?.addEventListener('click', async event => {
        event.preventDefault();
        try {
            await navigator.clipboard.writeText(emailLink.dataset.copy);
            emailLink.classList.add('copied');
            const tooltip = emailLink.querySelector('.copy-tooltip');
            if (tooltip) tooltip.textContent = 'Copied!';
            window.setTimeout(() => {
                emailLink.classList.remove('copied');
                if (tooltip) tooltip.textContent = 'Click to copy';
            }, 2000);
        } catch (error) {
            console.error('Failed to copy email:', error);
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('section, .service-card, .project-card, .about-content, .contact-content').forEach(element => observer.observe(element));
    document.querySelector('#home')?.classList.add('visible');
});
