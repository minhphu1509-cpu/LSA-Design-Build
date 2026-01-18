// Shared Data & Logic

const defaultContent = {
    hero_title: "KIẾN TẠO KHÔNG GIAN\nNÂNG TẦM CUỘC SỐNG",
    hero_subtitle: "ARCHITECTURE & INTERIOR",
    hero_desc: "LSA Design & Build mang đến những giải pháp kiến trúc và nội thất đẳng cấp, biến ngôi nhà mơ ước của bạn thành hiện thực.",
    service_subtitle: "Giải pháp toàn diện từ thiết kế đến thi công"
};

const defaultProjects = [
    {
        id: 1,
        title: "Biệt thự ven hồ Ecopark",
        category: "villa",
        desc: "Không gian sống sang trọng hòa mình với thiên nhiên, phong cách hiện đại.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Nhà phố liền kề Luxury",
        category: "townhouse",
        desc: "Thiết kế tối ưu diện tích, nội thất cao cấp nhập khẩu Ý.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Sky Penthouse Quận 1",
        category: "penthouse",
        desc: "Tầm nhìn panorama toàn thành phố, phong cách Neo-Classic.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
    }
];

// Index Page Logic
function siteData() {
    return {
        mobileMenu: false,
        scrolled: false,
        content: JSON.parse(localStorage.getItem('lsa_content')) || defaultContent,
        projects: JSON.parse(localStorage.getItem('lsa_projects')) || defaultProjects,
        filteredProjects: [],
        activeFilter: 'all',
        form: {
            name: '',
            phone: '',
            service: 'Kiến trúc',
            message: ''
        },
        formStatus: '',

        init() {
            this.filteredProjects = this.projects;
            this.setupObserver();
        },

        filterProjects(category) {
            this.activeFilter = category;
            if (category === 'all') {
                this.filteredProjects = this.projects;
            } else {
                this.filteredProjects = this.projects.filter(p => p.category === category);
            }
        },

        submitLead() {
            const newLead = {
                ...this.form,
                date: new Date().toLocaleString('vi-VN')
            };
            
            // Get existing leads
            const leads = JSON.parse(localStorage.getItem('lsa_leads')) || [];
            leads.unshift(newLead);
            localStorage.setItem('lsa_leads', JSON.stringify(leads));

            this.formStatus = "Đã gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm.";
            this.form = { name: '', phone: '', service: 'Kiến trúc', message: '' };
            setTimeout(() => this.formStatus = '', 5000);
        },

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scrolled');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.scroll-element').forEach((el) => {
                observer.observe(el);
            });
        }
    }
}

// Admin Page Logic
function adminApp() {
    return {
        loggedIn: sessionStorage.getItem('lsa_auth') === 'true',
        password: '',
        loginError: false,
        tab: 'content',
        content: JSON.parse(localStorage.getItem('lsa_content')) || defaultContent,
        projects: JSON.parse(localStorage.getItem('lsa_projects')) || defaultProjects,
        leads: JSON.parse(localStorage.getItem('lsa_leads')) || [],
        newProject: { title: '', category: 'villa', image: '', desc: '' },
        saveMessage: '',

        login() {
            if (this.password === 'Phu@1976') {
                this.loggedIn = true;
                sessionStorage.setItem('lsa_auth', 'true');
                this.loginError = false;
            } else {
                this.loginError = true;
            }
        },

        logout() {
            this.loggedIn = false;
            sessionStorage.removeItem('lsa_auth');
        },

        saveContent() {
            localStorage.setItem('lsa_content', JSON.stringify(this.content));
            this.saveMessage = "Đã lưu thành công!";
            setTimeout(() => this.saveMessage = '', 3000);
        },

        addProject() {
            if(!this.newProject.title) return alert("Vui lòng nhập tên dự án");
            this.newProject.id = Date.now();
            this.projects.push({...this.newProject});
            localStorage.setItem('lsa_projects', JSON.stringify(this.projects));
            this.newProject = { title: '', category: 'villa', image: '', desc: '' };
        },

        removeProject(index) {
            if(confirm("Bạn có chắc muốn xóa dự án này?")) {
                this.projects.splice(index, 1);
                localStorage.setItem('lsa_projects', JSON.stringify(this.projects));
            }
        }
    }
}