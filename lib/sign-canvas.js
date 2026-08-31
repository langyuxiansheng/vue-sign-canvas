import { computed as e, createElementBlock as t, defineComponent as n, nextTick as r, normalizeClass as i, onBeforeUnmount as a, onMounted as o, openBlock as s, ref as c, shallowRef as l, unref as u, watch as d, withModifiers as f } from "vue";
//#region packages/SignCanvas/constants.ts
var p = {
	isFullScreen: !1,
	isFullCover: !1,
	isDpr: !1,
	lastWriteWidth: 2,
	lineCap: "round",
	lineJoin: "round",
	canvasWidth: 600,
	canvasHeight: 600,
	isShowBorder: !0,
	bgColor: "none",
	backgroundImage: "",
	backgroundImageFit: "cover",
	backgroundImageOpacity: 1,
	borderWidth: 1,
	borderColor: "#ff787f",
	writeWidth: 5,
	maxWriteWidth: 30,
	minWriteWidth: 5,
	writeColor: "#101010",
	isSign: !1,
	imgType: "png",
	quality: 1,
	jpegBgColor: "#fff",
	exportRotate: 0,
	enableResize: !0,
	disabled: !1,
	readonly: !1,
	allowEmpty: !1,
	enableHistory: !0,
	enableShortcuts: !0,
	maxHistory: 100,
	guideEnabled: !1,
	guideText: "",
	guideFont: "700 96px serif",
	guideTextColor: "#101010",
	guideTextOpacity: .16,
	guideImage: "",
	guideImageFit: "contain",
	guideImageOpacity: .24
};
//#endregion
//#region packages/SignCanvas/utils/canvas.ts
function m(e, t) {
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function h(e) {
	let t = String(e || "png").toLowerCase();
	return t === "jpg" ? "jpeg" : t === "jpeg" || t === "webp" ? t : "png";
}
function g(e) {
	let t = m(e, 1);
	return t < .1 || t > 1 ? 1 : t;
}
function _(e, t) {
	let n = t.getBoundingClientRect();
	return {
		x: e.clientX - n.left,
		y: e.clientY - n.top
	};
}
function v(e) {
	return e.isFullScreen ? {
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	} : {
		width: m(e.canvasWidth, 600),
		height: m(e.canvasHeight, 600)
	};
}
function ee(e, t, n) {
	e.width = Math.floor(t.width * n), e.height = Math.floor(t.height * n), e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
}
function te(e, t) {
	if (t.isFullScreen && t.isFullCover) {
		e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.margin = "0", e.style.zIndex = "20001";
		return;
	}
	e.style.position = "", e.style.top = "", e.style.left = "", e.style.margin = "", e.style.zIndex = "";
}
function ne(e, t, n, r, i = {}) {
	if (e.save(), e.clearRect(0, 0, t.width, t.height), n.bgColor && n.bgColor !== "none" && (e.fillStyle = n.bgColor, e.fillRect(0, 0, t.width, t.height)), i.backgroundImage && x(e, i.backgroundImage, t, n.backgroundImageFit, T(n.backgroundImageOpacity)), n.guideEnabled && (i.guideImage ? x(e, i.guideImage, t, n.guideImageFit, T(n.guideImageOpacity)) : n.guideText && C(e, t, n)), !n.isShowBorder) {
		e.restore();
		return;
	}
	let a = m(n.borderWidth, 1) * r, o = a / 2;
	e.beginPath(), e.lineWidth = a, e.strokeStyle = n.borderColor, e.moveTo(o, o), e.lineTo(t.width - o, o), e.lineTo(t.width - o, t.height - o), e.lineTo(o, t.height - o), e.closePath(), e.stroke(), n.isSign || (e.beginPath(), e.moveTo(0, 0), e.lineTo(t.width, t.height), e.moveTo(t.width, 0), e.lineTo(0, t.height), e.moveTo(t.width / 2, 0), e.lineTo(t.width / 2, t.height), e.moveTo(0, t.height / 2), e.lineTo(t.width, t.height / 2), e.stroke()), e.restore();
}
function y(e, t, n = t.quality) {
	let r = h(t.imgType), i = g(n), a = document.createElement("canvas"), o = a.getContext("2d");
	if (!o) return e.toDataURL(`image/${r}`, i);
	let s = E(t.exportRotate), c = s === 90 || s === 270, l = Math.max(1, Math.floor(e.width * i)), u = Math.max(1, Math.floor(e.height * i));
	return a.width = c ? u : l, a.height = c ? l : u, r === "jpeg" && (o.fillStyle = t.bgColor && t.bgColor !== "none" ? t.bgColor : t.jpegBgColor, o.fillRect(0, 0, a.width, a.height)), D(o, e, l, u, s), a.toDataURL(`image/${r}`, i);
}
function b(e) {
	return new Promise((t, n) => {
		let r = new Image();
		/^https?:\/\//.test(e) && (r.crossOrigin = "anonymous"), r.onload = () => t(r), r.onerror = n, r.src = e;
	});
}
function x(e, t, n, r, i) {
	let a = S(t, n, r);
	e.save(), e.globalAlpha = i, e.drawImage(t, a.x, a.y, a.width, a.height), e.restore();
}
function S(e, t, n) {
	if (n === "stretch") return {
		x: 0,
		y: 0,
		width: t.width,
		height: t.height
	};
	let r = e.naturalWidth || t.width, i = e.naturalHeight || t.height, a = r / i, o = t.width / t.height, s = r, c = i;
	return n === "center" ? (s = Math.min(r, t.width), c = Math.min(i, t.height)) : n === "cover" && a > o || n === "contain" && a < o ? (c = t.height, s = c * a) : (s = t.width, c = s / a), {
		x: (t.width - s) / 2,
		y: (t.height - c) / 2,
		width: s,
		height: c
	};
}
function C(e, t, n) {
	let r = n.guideText.trim();
	if (!r) return;
	e.save(), e.globalAlpha = T(n.guideTextOpacity), e.fillStyle = n.guideTextColor, e.textAlign = "center", e.textBaseline = "middle", e.font = n.guideFont;
	let i = t.width * .78, a = e.measureText(r);
	if (a.width > i && a.width > 0) {
		let t = w(n.guideFont), r = Math.max(12, Math.floor(t * i / a.width));
		e.font = n.guideFont.replace(`${t}px`, `${r}px`);
	}
	e.fillText(r, t.width / 2, t.height / 2, i), e.restore();
}
function w(e) {
	let t = e.match(/(\d+(?:\.\d+)?)px/);
	return t ? Number(t[1]) : 96;
}
function T(e) {
	return Math.min(1, Math.max(0, m(e, 1)));
}
function E(e) {
	return e === 90 || e === 180 || e === 270 ? e : 0;
}
function D(e, t, n, r, i) {
	if (i === 0) {
		e.drawImage(t, 0, 0, n, r);
		return;
	}
	e.save(), i === 90 ? (e.translate(r, 0), e.rotate(Math.PI / 2)) : i === 180 ? (e.translate(n, r), e.rotate(Math.PI)) : (e.translate(0, n), e.rotate(-Math.PI / 2)), e.drawImage(t, 0, 0, n, r), e.restore();
}
//#endregion
//#region packages/SignCanvas/useSignCanvas.ts
function O(t) {
	let { canvasRef: n, props: i, emit: s } = t, u = l(null), f = c(k(i.options)), h = c({
		width: f.value.canvasWidth,
		height: f.value.canvasHeight
	}), g = c(1), x = c([]), S = c([]), C = c([]), w = c([]), T = l(null), E = l(null), D = c(""), O = l(null), A = c(""), j = c(null), M = c(!1), N = c(null), P = c(!1), F = c(!1), I = c(null), L = c(0), R = c(f.value.lastWriteWidth), z = c(null), ce = c(!1), B = c(0), le = e(() => !!(f.value.disabled || f.value.readonly));
	function V() {
		let e = n.value;
		e && (f.value = k(i.options, f.value), g.value = f.value.isDpr && window.devicePixelRatio || 1, h.value = v(f.value), u.value = e.getContext("2d"), ee(e, h.value, g.value), te(e, f.value), re(e), H());
	}
	function H() {
		let e = n.value, t = u.value;
		!e || !t || (ne(t, e, f.value, g.value, {
			backgroundImage: E.value,
			guideImage: O.value
		}), T.value && t.drawImage(T.value, 0, 0, e.width, e.height), x.value.forEach(U), F.value = !!T.value || x.value.length > 0);
	}
	function U(e) {
		let t = u.value;
		if (t) {
			if (t.save(), t.beginPath(), t.fillStyle = e.color, t.strokeStyle = e.color, e.type === "point") {
				t.arc(e.point.x * g.value, e.point.y * g.value, e.radius * g.value, 0, Math.PI * 2), t.fill(), t.restore();
				return;
			}
			t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.lineWidth = e.lineWidth * g.value, t.moveTo(e.from.x * g.value, e.from.y * g.value), t.lineTo(e.to.x * g.value, e.to.y * g.value), t.stroke(), t.restore();
		}
	}
	function ue(e) {
		le.value || !n.value || M.value || !e.isPrimary || (n.value.focus(), ie(n.value, e.pointerId), N.value = e.pointerId, M.value = !0, P.value = !1, w.value = [], I.value = _(e, n.value), L.value = Date.now(), R.value = m(f.value.lastWriteWidth, p.lastWriteWidth), s("start", I.value));
	}
	function de(e) {
		if (!M.value || !I.value || !n.value || !q(e)) return;
		let t = _(e, n.value), r = Ce(I.value, t);
		x.value.push(r), w.value.push(r), U(r), I.value = t, P.value = !0, F.value = !0;
	}
	function W(e) {
		q(e) && K(e, {
			commitPoint: !0,
			releaseCapture: !0
		});
	}
	function G(e) {
		q(e) && K(e, {
			commitPoint: !1,
			releaseCapture: !0
		});
	}
	function fe(e) {
		!q(e) || e.pointerType !== "mouse" || K(e, {
			commitPoint: !0,
			releaseCapture: !0
		});
	}
	function pe(e) {
		!q(e) || !M.value || K(e, {
			commitPoint: !1,
			releaseCapture: !1
		});
	}
	function K(e, t) {
		if (!M.value || !n.value) return;
		let r = _(e, n.value);
		if (!P.value) {
			let e = we(r);
			t.commitPoint && (x.value.push(e), w.value.push(e), U(e), F.value = !0);
		}
		Oe(), M.value = !1, N.value = null, I.value = null, t.releaseCapture && ae(n.value, e.pointerId), Ee(), s("end", r), s("change", Q());
	}
	function q(e) {
		return N.value !== null && e.pointerId === N.value;
	}
	function J(e = !0) {
		let t = typeof e == "boolean" ? e : e.emit !== !1;
		x.value = [], S.value = [], C.value = [], w.value = [], T.value = null, N.value = null, F.value = !1, j.value = null, H(), t && ($(), s("clear"), s("change", Q()));
	}
	function me(e = !0) {
		J(e);
	}
	function he(e = {}) {
		return Y(e);
	}
	function Y(e = {}) {
		let t = e.allowEmpty ?? f.value.allowEmpty, r = n.value;
		if (!r || !t && Z()) return $(), null;
		let i = y(r, f.value, e.quality ?? f.value.quality);
		return j.value = i, De(i), i;
	}
	function ge(e) {
		let t = Y();
		if (!t) return null;
		let n = document.createElement("a");
		return n.href = t, n.download = `${e || Date.now()}.${f.value.imgType}`, n.click(), t;
	}
	function _e(e = f.value.quality) {
		return Y({
			quality: e,
			allowEmpty: f.value.allowEmpty
		});
	}
	async function X(e, t = {}) {
		if (!e) return J({ emit: t.emit !== !1 }), null;
		let n = await b(e);
		return t.clear !== !1 && (x.value = [], S.value = [], C.value = [], w.value = []), T.value = n, F.value = !0, j.value = e, H(), t.emit !== !1 && (De(e), s("change", Q())), e;
	}
	function Z() {
		return !F.value;
	}
	function ve() {
		if (!be()) return !1;
		let e = S.value.pop();
		return e ? (x.value.splice(Math.max(0, x.value.length - e.length), e.length), C.value.push(e), H(), Ee(), s("undo", Q()), s("change", Q()), !0) : !1;
	}
	function ye() {
		if (!xe()) return !1;
		let e = C.value.pop();
		return e ? (x.value.push(...e), S.value.push(e), H(), Ee(), s("redo", Q()), s("change", Q()), !0) : !1;
	}
	function be() {
		return f.value.enableHistory && S.value.length > 0;
	}
	function xe() {
		return f.value.enableHistory && C.value.length > 0;
	}
	function Se() {
		return x.value.map((e) => e.type === "point" ? {
			...e,
			point: { ...e.point }
		} : {
			...e,
			from: { ...e.from },
			to: { ...e.to }
		});
	}
	function Q() {
		return {
			empty: Z(),
			strokes: x.value.length,
			hasImage: !!T.value,
			canUndo: be(),
			canRedo: xe(),
			history: S.value.length,
			redo: C.value.length
		};
	}
	function Ce(e, t) {
		return {
			type: "line",
			from: e,
			to: t,
			lineWidth: Te(),
			color: f.value.writeColor,
			lineCap: f.value.lineCap,
			lineJoin: f.value.lineJoin
		};
	}
	function we(e) {
		let t = m(f.value.writeWidth, p.writeWidth);
		return {
			type: "point",
			point: e,
			radius: Math.max(t / 2, 1),
			color: f.value.writeColor
		};
	}
	function Te() {
		if (f.value.isSign) return m(f.value.writeWidth, p.writeWidth);
		let e = Date.now(), t = Math.max(e - L.value, 1);
		L.value = e;
		let n = m(f.value.minWriteWidth, p.minWriteWidth), r = m(f.value.maxWriteWidth, p.maxWriteWidth), i = Math.max(n, Math.min(r, n + (r - n) * t / 30));
		return R.value = R.value / 4 * 3 + i / 4, Number(R.value.toFixed(2));
	}
	function Ee() {
		if (!f.value.allowEmpty && Z()) {
			$();
			return;
		}
		let e = n.value;
		if (!e) {
			$();
			return;
		}
		let t = y(e, f.value, f.value.quality);
		j.value = t, De(t);
	}
	function De(e) {
		s("update:modelValue", e), s("confirm", e);
	}
	function $() {
		j.value = null, s("update:modelValue", null), s("confirm", null);
	}
	function Oe() {
		if (!f.value.enableHistory || w.value.length === 0) {
			w.value = [];
			return;
		}
		S.value.push([...w.value]);
		let e = Math.max(1, Number(f.value.maxHistory) || p.maxHistory);
		S.value.length > e && S.value.shift(), C.value = [], w.value = [];
	}
	function ke(e) {
		if (!f.value.enableShortcuts || document.activeElement !== n.value || se(e.target)) return;
		let t = e.key.toLowerCase();
		if (e.metaKey || e.ctrlKey) {
			if (t === "z" && !e.shiftKey) {
				ve() && e.preventDefault();
				return;
			}
			(t === "y" || t === "z" && e.shiftKey) && ye() && e.preventDefault();
		}
	}
	function Ae() {
		f.value.enableResize ? je() : Me();
	}
	function je() {
		ce.value ||= (window.addEventListener("resize", Ne, !1), !0);
	}
	function Me() {
		ce.value &&= (window.removeEventListener("resize", Ne, !1), !1);
	}
	function Ne() {
		z.value && clearTimeout(z.value), z.value = setTimeout(V, 100);
	}
	async function Pe() {
		let e = B.value + 1;
		B.value = e;
		let t = f.value.backgroundImage || "", n = f.value.guideImage || "", r = t !== D.value, i = n !== A.value;
		if (!r && !i) return;
		let [a, o] = await Promise.all([r ? oe(t) : Promise.resolve(E.value), i ? oe(n) : Promise.resolve(O.value)]);
		e === B.value && (r && (D.value = t, E.value = a), i && (A.value = n, O.value = o));
	}
	return d(() => i.options, async () => {
		f.value = k(i.options, f.value), await Pe(), V(), Ae();
	}, { deep: !0 }), d(() => i.modelValue || i.image, async (e) => {
		e !== j.value && (e ? await X(e, { emit: !1 }) : J(!1));
	}), o(async () => {
		await r(), V(), Ae(), await Pe(), H(), window.addEventListener("keydown", ke, !1), window.addEventListener("pointerup", W, !1), window.addEventListener("pointercancel", G, !1);
		let e = i.modelValue || i.image;
		e && await X(e, { emit: !1 });
	}), a(() => {
		Me(), z.value && clearTimeout(z.value), window.removeEventListener("keydown", ke, !1), window.removeEventListener("pointerup", W, !1), window.removeEventListener("pointercancel", G, !1);
	}), {
		options: f,
		isDisabled: le,
		isEmpty: Z,
		getSignatureStatus: Q,
		handlePointerDown: ue,
		handlePointerMove: de,
		handlePointerUp: W,
		handlePointerCancel: G,
		handlePointerLeave: fe,
		handleLostPointerCapture: pe,
		canvasClear: J,
		clear: me,
		undo: ve,
		redo: ye,
		canUndo: be,
		canRedo: xe,
		getStrokes: Se,
		saveAsImg: he,
		toDataURL: Y,
		downloadSignImg: ge,
		dealImage: _e,
		fromDataURL: X,
		redraw: H,
		initCanvas: V
	};
}
function k(e, t = p) {
	return Object.assign({}, p, t, e || {});
}
function re(e) {
	e.style.touchAction = "none", e.style.userSelect = "none", e.style.webkitUserSelect = "none";
}
function ie(e, t) {
	try {
		e.setPointerCapture?.(t);
	} catch {}
}
function ae(e, t) {
	try {
		e.releasePointerCapture?.(t);
	} catch {}
}
async function oe(e) {
	if (!e) return null;
	try {
		return await b(e);
	} catch {
		return null;
	}
}
function se(e) {
	if (!(e instanceof HTMLElement)) return !1;
	let t = e.tagName.toLowerCase();
	return e.isContentEditable || t === "input" || t === "textarea" || t === "select";
}
//#endregion
//#region packages/SignCanvas/index.vue?vue&type=script&setup=true&lang.ts
var A = ["aria-disabled"], j = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ n({
	name: "SignCanvas",
	__name: "index",
	props: {
		modelValue: { default: null },
		image: { default: null },
		options: { default: null }
	},
	emits: [
		"update:modelValue",
		"confirm",
		"start",
		"end",
		"change",
		"clear",
		"undo",
		"redo"
	],
	setup(e, { expose: n, emit: r }) {
		let a = e, o = r, l = c(null), { isDisabled: d, handlePointerDown: p, handlePointerMove: m, handlePointerUp: h, handlePointerCancel: g, handlePointerLeave: _, handleLostPointerCapture: v, canvasClear: ee, clear: te, undo: ne, redo: y, canUndo: b, canRedo: x, getStrokes: S, saveAsImg: C, toDataURL: w, downloadSignImg: T, dealImage: E, fromDataURL: D, isEmpty: k, getSignatureStatus: re, redraw: ie, initCanvas: ae } = O({
			canvasRef: l,
			props: a,
			emit: o
		});
		return n({
			clear: te,
			canvasClear: ee,
			undo: ne,
			redo: y,
			canUndo: b,
			canRedo: x,
			getStrokes: S,
			saveAsImg: C,
			toDataURL: w,
			downloadSignImg: T,
			dealImage: E,
			fromDataURL: D,
			isEmpty: k,
			getSignatureStatus: re,
			redraw: ie,
			initCanvas: ae
		}), (e, n) => (s(), t("canvas", {
			ref_key: "canvasRef",
			ref: l,
			class: i(["app-sign-canvas", { "is-disabled": u(d) }]),
			"aria-disabled": u(d),
			tabindex: "0",
			onPointerdown: n[0] ||= f((...e) => u(p) && u(p)(...e), ["prevent", "stop"]),
			onPointermove: n[1] ||= f((...e) => u(m) && u(m)(...e), ["prevent", "stop"]),
			onPointerup: n[2] ||= f((...e) => u(h) && u(h)(...e), ["prevent", "stop"]),
			onPointercancel: n[3] ||= f((...e) => u(g) && u(g)(...e), ["prevent", "stop"]),
			onPointerleave: n[4] ||= f((...e) => u(_) && u(_)(...e), ["prevent", "stop"]),
			onLostpointercapture: n[5] ||= (...e) => u(v) && u(v)(...e)
		}, " 您的浏览器不支持canvas技术,请升级浏览器! ", 42, A));
	}
}), [["__scopeId", "data-v-54db14ef"]]);
//#endregion
//#region packages/index.ts
j.install = (e) => {
	e.component("SignCanvas", j);
};
var M = j;
//#endregion
export { j as SignCanvas, M as default };
