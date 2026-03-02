/* ============================================================
   BELLA VISTA BISTRO — three-scenes.js
   Three.js 3D: Wine Glass · Signature Dish · Wine Bottle
   ============================================================ */
(function () {
    'use strict';

    if (typeof THREE === 'undefined') { console.warn('Three.js not loaded'); return; }

    /* ── HELPERS ── */
    function canvasSize(canvas, fallbackW, fallbackH) {
        const r = canvas.getBoundingClientRect();
        return {
            w: (r.width || canvas.width || fallbackW),
            h: (r.height || canvas.height || fallbackH)
        };
    }

    function mkRenderer(canvas, w, h) {
        const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        r.setSize(w, h, false);
        r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        r.setClearColor(0x000000, 0);
        return r;
    }

    function lights(scene) {
        scene.add(new THREE.AmbientLight(0x3A3020, 0.7));
        const key = new THREE.DirectionalLight(0xFFEECC, 2.5);
        key.position.set(3, 6, 4); scene.add(key);
        const fill = new THREE.DirectionalLight(0xC5A059, 0.9);
        fill.position.set(-4, 2, -2); scene.add(fill);
        const rim = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        rim.position.set(0, -3, -4); scene.add(rim);
        const pt = new THREE.PointLight(0xC5A059, 1.4, 20);
        pt.position.set(0, 2, 4); scene.add(pt);
    }

    function goldMat() {
        return new THREE.MeshStandardMaterial({ color: 0xC5A059, metalness: 0.85, roughness: 0.18 });
    }

    function glassMat() {
        return new THREE.MeshPhysicalMaterial({
            color: 0xCCDDEE, metalness: 0.02, roughness: 0.04,
            transmission: 0.88, transparent: true, opacity: 0.55,
            ior: 1.52, clearcoat: 1.0
        });
    }

    /* drag-to-rotate + inertia */
    function drag(canvas, obj) {
        let down = false, lx = 0, ly = 0, vx = 0, vy = 0;
        canvas.addEventListener('mousedown', e => { down = true; lx = e.clientX; ly = e.clientY; vx = vy = 0; });
        window.addEventListener('mousemove', e => {
            if (!down) return;
            vx = (e.clientX - lx) * 0.009; vy = (e.clientY - ly) * 0.009;
            obj.rotation.y += vx; obj.rotation.x += vy;
            lx = e.clientX; ly = e.clientY;
        });
        window.addEventListener('mouseup', () => down = false);
        let ltx = 0;
        canvas.addEventListener('touchstart', e => { ltx = e.touches[0].clientX; vx = 0; }, { passive: true });
        canvas.addEventListener('touchmove', e => {
            const dx = e.touches[0].clientX - ltx;
            vx = dx * 0.012; obj.rotation.y += vx; ltx = e.touches[0].clientX;
            e.preventDefault();
        }, { passive: false });
        return () => { if (!down) { obj.rotation.y += vx; obj.rotation.x += vy; vx *= 0.92; vy *= 0.92; } };
    }

    function scrollZoom(canvas, cam, mn, mx) {
        canvas.addEventListener('wheel', e => {
            cam.position.z = Math.min(mx, Math.max(mn, cam.position.z + e.deltaY * 0.005));
            e.preventDefault();
        }, { passive: false });
    }

    /* ─────────────────────────────────────────────
       SCENE 1 — Floating Wine Glass (Hero)
    ───────────────────────────────────────────── */
    function heroGlass() {
        const canvas = document.getElementById('hero-3d-glass');
        if (!canvas) return;
        const { w, h } = canvasSize(canvas, 360, 540);
        const renderer = mkRenderer(canvas, w, h);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
        camera.position.set(0, 0, 7.5);
        lights(scene);

        const g = new THREE.Group();

        // Bowl
        const bPts = [
            [0.02, -1.8], [0.06, -1.4], [0.16, -1.0], [0.28, -0.5],
            [0.40, 0.2], [0.46, 0.8], [0.47, 1.4], [0.43, 2.0], [0.37, 2.6]
        ].map(([x, y]) => new THREE.Vector2(x, y));
        g.add(new THREE.Mesh(new THREE.LatheGeometry(bPts, 64), glassMat()));

        // Wine fill inside bowl
        const wPts = [
            [0.01, -1.7], [0.14, -1.0], [0.27, -0.4], [0.38, 0.3], [0.43, 0.85]
        ].map(([x, y]) => new THREE.Vector2(x, y));
        const wMat = new THREE.MeshStandardMaterial({ color: 0x8B1A1A, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
        g.add(new THREE.Mesh(new THREE.LatheGeometry(wPts, 48), wMat));

        // Wine surface cap
        const cap = new THREE.Mesh(new THREE.CircleGeometry(0.43, 48),
            new THREE.MeshStandardMaterial({ color: 0x6B0A0A, transparent: true, opacity: 0.75 }));
        cap.rotation.x = -Math.PI / 2; cap.position.y = 0.85; g.add(cap);

        // Stem
        const sPts = [[0.025, -1.8], [0.02, -3.6]].map(([x, y]) => new THREE.Vector2(x, y));
        g.add(new THREE.Mesh(new THREE.LatheGeometry(sPts, 20), glassMat()));

        // Base
        const basePts = [[0.02, -3.6], [0.15, -3.7], [0.5, -3.78], [0.55, -3.85], [0.5, -3.94], [0.0, -3.94]]
            .map(([x, y]) => new THREE.Vector2(x, y));
        g.add(new THREE.Mesh(new THREE.LatheGeometry(basePts, 48), glassMat()));

        // Floating dust
        const dGeo = new THREE.BufferGeometry();
        const dPos = new Float32Array(80 * 3);
        for (let i = 0; i < 80; i++) { dPos[i * 3] = (Math.random() - .5) * 2.8; dPos[i * 3 + 1] = (Math.random() - .5) * 7; dPos[i * 3 + 2] = (Math.random() - .5) * 2; }
        dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
        const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: 0xC5A059, size: 0.026, transparent: true, opacity: 0.55 }));
        scene.add(dust); scene.add(g);
        g.position.set(0.1, 0.7, 0);

        const tick = drag(canvas, g);
        let t = 0;
        (function loop() {
            requestAnimationFrame(loop); t += 0.012;
            g.rotation.y += 0.004; g.position.y = 0.7 + Math.sin(t) * 0.12;
            dust.rotation.y += 0.002; tick();
            renderer.render(scene, camera);
        })();
    }

    /* ─────────────────────────────────────────────
       SCENE 2 — Signature Dish (Truffle Risotto)
    ───────────────────────────────────────────── */
    function dishScene() {
        const canvas = document.getElementById('dish-3d');
        if (!canvas) return;
        const { w, h } = canvasSize(canvas, 520, 480);
        const renderer = mkRenderer(canvas, w, h);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
        camera.position.set(0, 3.2, 5.8); camera.lookAt(0, 0, 0);

        scene.add(new THREE.AmbientLight(0x201810, 0.8));
        const key = new THREE.DirectionalLight(0xFFEEDD, 3.0); key.position.set(4, 8, 5); scene.add(key);
        const fill = new THREE.DirectionalLight(0xD4A030, 1.0); fill.position.set(-3, 3, -2); scene.add(fill);
        const up = new THREE.PointLight(0xFFCC66, 1.2, 12); up.position.set(0, 5, 0); scene.add(up);

        const dish = new THREE.Group();

        // Plate rim
        const plateMat = new THREE.MeshStandardMaterial({ color: 0xFAF8F5, metalness: 0.04, roughness: 0.18 });
        dish.add(new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.15, 0.08, 64), plateMat));

        // Plate inner bowl (parabola profile)
        const ipts = []; for (let i = 0; i <= 20; i++) { const t2 = i / 20; ipts.push(new THREE.Vector2(t2 * 1.8, -t2 * t2 * 0.28 + 0.04)); }
        dish.add(new THREE.Mesh(new THREE.LatheGeometry(ipts, 64), new THREE.MeshStandardMaterial({ color: 0xF5F2EE, roughness: 0.3 })));

        // Gold rim ring
        const gr = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.025, 16, 100), goldMat());
        gr.rotation.x = Math.PI / 2; gr.position.y = 0.05; dish.add(gr);
        const gr2 = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.012, 16, 100), goldMat());
        gr2.rotation.x = Math.PI / 2; gr2.position.y = 0.02; dish.add(gr2);

        // Risotto mound
        const rPts = []; for (let i = 0; i <= 24; i++) { const t2 = i / 24; rPts.push(new THREE.Vector2((1 - t2) * 1.22, Math.pow(1 - t2, 0.45) * 0.46 + 0.04)); }
        dish.add(new THREE.Mesh(new THREE.LatheGeometry(rPts, 48),
            new THREE.MeshStandardMaterial({ color: 0xC4A06A, roughness: 0.92 })));

        // Truffle shavings (dark irregular discs)
        for (let i = 0; i < 9; i++) {
            const a = (i / 9) * Math.PI * 2, r = 0.38 + Math.random() * 0.55;
            const disc = new THREE.Mesh(
                new THREE.CylinderGeometry(0.07 + Math.random() * 0.1, 0.05 + Math.random() * 0.08, 0.018, 10),
                new THREE.MeshStandardMaterial({ color: 0x1A1208, roughness: 0.85 }));
            disc.position.set(Math.cos(a) * r, 0.47 + Math.random() * 0.08, Math.sin(a) * r);
            disc.rotation.set((Math.random() - .5) * .45, Math.random() * Math.PI, (Math.random() - .5) * .45);
            dish.add(disc);
        }

        // Microgreens
        for (let i = 0; i < 14; i++) {
            const a = Math.random() * Math.PI * 2, r = Math.random() * 0.75;
            const s = new THREE.Mesh(
                new THREE.CylinderGeometry(0.008, 0.005, 0.12 + Math.random() * 0.22, 5),
                new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(0.28 + Math.random() * .1, .7, .24), roughness: .9 }));
            s.position.set(Math.cos(a) * r, 0.5 + Math.random() * .12, Math.sin(a) * r);
            s.rotation.set((Math.random() - .5) * .9, 0, (Math.random() - .5) * .9);
            dish.add(s);
        }

        // Gold reduction drizzle
        const drizMat = new THREE.MeshStandardMaterial({ color: 0xC5A059, metalness: .8, roughness: .05 });
        for (let d = 0; d < 5; d++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3((Math.random() - .5) * 1.3, .28, (Math.random() - .5) * 1.3),
                new THREE.Vector3((Math.random() - .5) * 1.7, .14, (Math.random() - .5) * 1.7),
                new THREE.Vector3((Math.random() - .5) * 1.9, .07, (Math.random() - .5) * 1.9)
            ]);
            dish.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 14, .014, 7, false), drizMat));
        }

        // Steam (animated points)
        const sGeo = new THREE.BufferGeometry();
        const sN = 55, sPos = new Float32Array(sN * 3), sPh = new Float32Array(sN);
        for (let i = 0; i < sN; i++) { sPos[i * 3] = (Math.random() - .5) * 1.2; sPos[i * 3 + 1] = .5 + Math.random() * 2.2; sPos[i * 3 + 2] = (Math.random() - .5) * 1.2; sPh[i] = Math.random() * Math.PI * 2; }
        sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
        const sMat = new THREE.PointsMaterial({ color: 0xFFFFFF, size: .038, transparent: true, opacity: .16 });
        const steam = new THREE.Points(sGeo, sMat); dish.add(steam);

        scene.add(dish); dish.rotation.x = -0.22;
        const tick = drag(canvas, dish);
        scrollZoom(canvas, camera, 3, 10);

        let t = 0;
        (function loop() {
            requestAnimationFrame(loop); t += 0.016;
            dish.rotation.y += 0.004;
            const pa = sGeo.attributes.position.array;
            for (let i = 0; i < sN; i++) {
                pa[i * 3 + 1] += 0.008; pa[i * 3] += Math.sin(t + sPh[i]) * .003;
                if (pa[i * 3 + 1] > 3.1) { pa[i * 3 + 1] = .5; pa[i * 3] = (Math.random() - .5) * 1.1; pa[i * 3 + 2] = (Math.random() - .5) * 1.1; }
            }
            sGeo.attributes.position.needsUpdate = true;
            sMat.opacity = .12 + Math.sin(t * .7) * .05;
            tick(); renderer.render(scene, camera);
        })();

        window.addEventListener('resize', () => {
            const nw = canvas.clientWidth || 520, nh = canvas.clientHeight || 480;
            renderer.setSize(nw, nh, false); camera.aspect = nw / nh; camera.updateProjectionMatrix();
        });
    }

    /* ─────────────────────────────────────────────
       SCENE 3 — Wine Bottle (VIP)
    ───────────────────────────────────────────── */
    function bottleScene() {
        const canvas = document.getElementById('bottle-3d');
        if (!canvas) return;
        const { w, h } = canvasSize(canvas, 220, 420);
        const renderer = mkRenderer(canvas, w, h);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 50);
        camera.position.set(0, 0, 9);
        lights(scene);

        const grp = new THREE.Group();

        // Bottle body (Bordeaux profile)
        const prof = [
            [0.0, 0.0], [0.52, 0.0], [0.54, .12], [0.54, 3.0], [0.52, 3.3],
            [0.38, 3.9], [0.22, 4.4], [0.20, 5.4], [0.23, 5.42], [0.23, 5.62],
            [0.24, 5.65], [0.24, 5.9], [0.01, 5.9]
        ].map(([x, y]) => new THREE.Vector2(x, y));
        const bottleMat = new THREE.MeshPhysicalMaterial({
            color: 0x1A3010, metalness: .04, roughness: .08,
            transmission: .55, transparent: true, opacity: .9, ior: 1.47, clearcoat: .6
        });
        grp.add(new THREE.Mesh(new THREE.LatheGeometry(prof, 64), bottleMat));

        // Wine inside
        const wp = [[0, 0.05], [0.48, 0.05], [0.48, 3.05], [0.36, 3.85], [0.18, 4.38], [0.18, 4.4], [0, 4.4]]
            .map(([x, y]) => new THREE.Vector2(x, y));
        grp.add(new THREE.Mesh(new THREE.LatheGeometry(wp, 48),
            new THREE.MeshStandardMaterial({ color: 0x5C0A0A, transparent: true, opacity: .82, roughness: .1 })));

        // Gold capsule
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(.245, .245, .28, 32), goldMat());
        cap.position.y = 5.76; grp.add(cap);

        // Cork
        const cork = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .12, 16),
            new THREE.MeshStandardMaterial({ color: 0xC8A86B, roughness: .95 }));
        cork.position.y = 5.96; grp.add(cork);

        // Label (tan rectangle)
        const lbl = new THREE.Mesh(new THREE.PlaneGeometry(.88, 1.55),
            new THREE.MeshStandardMaterial({ color: 0xEDE0C4, roughness: .8 }));
        lbl.position.set(0, 1.8, .545); grp.add(lbl);

        // Gold label border lines
        const eg = new THREE.EdgesGeometry(new THREE.PlaneGeometry(.88, 1.55));
        const lb = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0xC5A059 }));
        lb.position.copy(lbl.position); grp.add(lb);

        // Bottom shadow disc
        const shad = new THREE.Mesh(new THREE.CircleGeometry(.58, 32),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .35, depthWrite: false }));
        shad.rotation.x = -Math.PI / 2; shad.position.y = -.01; grp.add(shad);

        // Floating gold dust
        const dGeo = new THREE.BufferGeometry();
        const dp = new Float32Array(50 * 3);
        for (let i = 0; i < 50; i++) { dp[i * 3] = (Math.random() - .5) * 2.2; dp[i * 3 + 1] = Math.random() * 7; dp[i * 3 + 2] = (Math.random() - .5) * 2; }
        dGeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
        const dustPts = new THREE.Points(dGeo, new THREE.PointsMaterial({ color: 0xE6C875, size: .032, transparent: true, opacity: .5 }));
        grp.add(dustPts);

        grp.position.y = -2.9; scene.add(grp);
        const tick = drag(canvas, grp);
        scrollZoom(canvas, camera, 5, 14);

        let t = 0;
        (function loop() {
            requestAnimationFrame(loop); t += .01;
            grp.rotation.y += .006; dustPts.rotation.y += .003;
            grp.position.y = -2.9 + Math.sin(t * .8) * .06;
            tick(); renderer.render(scene, camera);
        })();

        window.addEventListener('resize', () => {
            const nw = canvas.clientWidth || 220, nh = canvas.clientHeight || 420;
            renderer.setSize(nw, nh, false); camera.aspect = nw / nh; camera.updateProjectionMatrix();
        });
    }

    /* ── BOOT: init after page + loading screen ── */
    function boot() {
        // Use rAF chain to ensure layout is computed
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    heroGlass();
                    dishScene();
                    bottleScene();
                }, 3100); // after loading screen fade (2700ms) + buffer
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
