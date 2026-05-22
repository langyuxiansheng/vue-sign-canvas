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
function ee(e) {
	return e.isFullScreen ? {
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	} : {
		width: m(e.canvasWidth, 600),
		height: m(e.canvasHeight, 600)
	};
}
function te(e, t, n) {
	e.width = Math.floor(t.width * n), e.height = Math.floor(t.height * n), e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
}
function ne(e, t) {
	if (t.isFullScreen && t.isFullCover) {
		e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.margin = "0", e.style.zIndex = "20001";
		return;
	}
	e.style.position = "", e.style.top = "", e.style.left = "", e.style.margin = "", e.style.zIndex = "";
}
function re(e, t, n, r, i = {}) {
	if (e.save(), e.clearRect(0, 0, t.width, t.height), n.bgColor && n.bgColor !== "none" && (e.fillStyle = n.bgColor, e.fillRect(0, 0, t.width, t.height)), i.backgroundImage && b(e, i.backgroundImage, t, n.backgroundImageFit, w(n.backgroundImageOpacity)), n.guideEnabled && (i.guideImage ? b(e, i.guideImage, t, n.guideImageFit, w(n.guideImageOpacity)) : n.guideText && S(e, t, n)), !n.isShowBorder) {
		e.restore();
		return;
	}
	let a = m(n.borderWidth, 1) * r, o = a / 2;
	e.beginPath(), e.lineWidth = a, e.strokeStyle = n.borderColor, e.moveTo(o, o), e.lineTo(t.width - o, o), e.lineTo(t.width - o, t.height - o), e.lineTo(o, t.height - o), e.closePath(), e.stroke(), n.isSign || (e.beginPath(), e.moveTo(0, 0), e.lineTo(t.width, t.height), e.moveTo(t.width, 0), e.lineTo(0, t.height), e.moveTo(t.width / 2, 0), e.lineTo(t.width / 2, t.height), e.moveTo(0, t.height / 2), e.lineTo(t.width, t.height / 2), e.stroke()), e.restore();
}
function v(e, t, n = t.quality) {
	let r = h(t.imgType), i = g(n), a = document.createElement("canvas"), o = a.getContext("2d");
	if (!o) return e.toDataURL(`image/${r}`, i);
	let s = T(t.exportRotate), c = s === 90 || s === 270, l = Math.max(1, Math.floor(e.width * i)), u = Math.max(1, Math.floor(e.height * i));
	return a.width = c ? u : l, a.height = c ? l : u, r === "jpeg" && (o.fillStyle = t.bgColor && t.bgColor !== "none" ? t.bgColor : t.jpegBgColor, o.fillRect(0, 0, a.width, a.height)), E(o, e, l, u, s), a.toDataURL(`image/${r}`, i);
}
function y(e) {
	return new Promise((t, n) => {
		let r = new Image();
		/^https?:\/\//.test(e) && (r.crossOrigin = "anonymous"), r.onload = () => t(r), r.onerror = n, r.src = e;
	});
}
function b(e, t, n, r, i) {
	let a = x(t, n, r);
	e.save(), e.globalAlpha = i, e.drawImage(t, a.x, a.y, a.width, a.height), e.restore();
}
function x(e, t, n) {
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
function S(e, t, n) {
	let r = n.guideText.trim();
	if (!r) return;
	e.save(), e.globalAlpha = w(n.guideTextOpacity), e.fillStyle = n.guideTextColor, e.textAlign = "center", e.textBaseline = "middle", e.font = n.guideFont;
	let i = t.width * .78, a = e.measureText(r);
	if (a.width > i && a.width > 0) {
		let t = C(n.guideFont), r = Math.max(12, Math.floor(t * i / a.width));
		e.font = n.guideFont.replace(`${t}px`, `${r}px`);
	}
	e.fillText(r, t.width / 2, t.height / 2, i), e.restore();
}
function C(e) {
	let t = e.match(/(\d+(?:\.\d+)?)px/);
	return t ? Number(t[1]) : 96;
}
function w(e) {
	return Math.min(1, Math.max(0, m(e, 1)));
}
function T(e) {
	return e === 90 || e === 180 || e === 270 ? e : 0;
}
function E(e, t, n, r, i) {
	if (i === 0) {
		e.drawImage(t, 0, 0, n, r);
		return;
	}
	e.save(), i === 90 ? (e.translate(r, 0), e.rotate(Math.PI / 2)) : i === 180 ? (e.translate(n, r), e.rotate(Math.PI)) : (e.translate(0, n), e.rotate(-Math.PI / 2)), e.drawImage(t, 0, 0, n, r), e.restore();
}
//#endregion
//#region packages/SignCanvas/useSignCanvas.ts
function D(t) {
	let { canvasRef: n, props: i, emit: s } = t, u = l(null), f = c(O(i.options)), h = c({
		width: f.value.canvasWidth,
		height: f.value.canvasHeight
	}), g = c(1), b = c([]), x = c([]), S = c([]), C = c([]), w = l(null), T = l(null), E = c(""), D = l(null), A = c(""), j = c(null), M = c(!1), N = c(!1), P = c(!1), F = c(null), I = c(0), L = c(f.value.lastWriteWidth), R = c(null), ae = c(!1), z = c(0), oe = e(() => !!(f.value.disabled || f.value.readonly));
	function B() {
		let e = n.value;
		e && (f.value = O(i.options, f.value), g.value = f.value.isDpr && window.devicePixelRatio || 1, h.value = ee(f.value), u.value = e.getContext("2d"), te(e, h.value, g.value), ne(e, f.value), V());
	}
	function V() {
		let e = n.value, t = u.value;
		!e || !t || (re(t, e, f.value, g.value, {
			backgroundImage: T.value,
			guideImage: D.value
		}), w.value && t.drawImage(w.value, 0, 0, e.width, e.height), b.value.forEach(H), P.value = !!w.value || b.value.length > 0);
	}
	function H(e) {
		let t = u.value;
		if (t) {
			if (t.save(), t.beginPath(), t.fillStyle = e.color, t.strokeStyle = e.color, e.type === "point") {
				t.arc(e.point.x * g.value, e.point.y * g.value, e.radius * g.value, 0, Math.PI * 2), t.fill(), t.restore();
				return;
			}
			t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.lineWidth = e.lineWidth * g.value, t.moveTo(e.from.x * g.value, e.from.y * g.value), t.lineTo(e.to.x * g.value, e.to.y * g.value), t.stroke(), t.restore();
		}
	}
	function se(e) {
		oe.value || !n.value || (n.value.focus(), n.value.setPointerCapture?.(e.pointerId), M.value = !0, N.value = !1, C.value = [], F.value = _(e, n.value), I.value = Date.now(), L.value = m(f.value.lastWriteWidth, p.lastWriteWidth), s("start", F.value));
	}
	function ce(e) {
		if (!M.value || !F.value || !n.value) return;
		let t = _(e, n.value), r = ve(F.value, t);
		b.value.push(r), C.value.push(r), H(r), F.value = t, N.value = !0, P.value = !0;
	}
	function le(e) {
		if (!M.value || !n.value) return;
		let t = _(e, n.value);
		if (!N.value) {
			let e = ye(t);
			b.value.push(e), C.value.push(e), H(e), P.value = !0;
		}
		xe(), n.value.releasePointerCapture?.(e.pointerId), M.value = !1, F.value = null, X(), s("end", t), s("change", Y());
	}
	function ue(e) {
		M.value && le(e);
	}
	function U(e = !0) {
		let t = typeof e == "boolean" ? e : e.emit !== !1;
		b.value = [], x.value = [], S.value = [], C.value = [], w.value = null, P.value = !1, j.value = null, V(), t && (Q(), s("clear"), s("change", Y()));
	}
	function de(e = !0) {
		U(e);
	}
	function fe(e = {}) {
		return W(e);
	}
	function W(e = {}) {
		let t = e.allowEmpty ?? f.value.allowEmpty, r = n.value;
		if (!r || !t && K()) return Q(), null;
		let i = v(r, f.value, e.quality ?? f.value.quality);
		return j.value = i, Z(i), i;
	}
	function pe(e) {
		let t = W();
		if (!t) return null;
		let n = document.createElement("a");
		return n.href = t, n.download = `${e || Date.now()}.${f.value.imgType}`, n.click(), t;
	}
	function me(e = f.value.quality) {
		return W({
			quality: e,
			allowEmpty: f.value.allowEmpty
		});
	}
	async function G(e, t = {}) {
		if (!e) return U({ emit: t.emit !== !1 }), null;
		let n = await y(e);
		return t.clear !== !1 && (b.value = [], x.value = [], S.value = [], C.value = []), w.value = n, P.value = !0, j.value = e, V(), t.emit !== !1 && (Z(e), s("change", Y())), e;
	}
	function K() {
		return !P.value;
	}
	function he() {
		if (!q()) return !1;
		let e = x.value.pop();
		return e ? (b.value.splice(Math.max(0, b.value.length - e.length), e.length), S.value.push(e), V(), X(), s("undo", Y()), s("change", Y()), !0) : !1;
	}
	function ge() {
		if (!J()) return !1;
		let e = S.value.pop();
		return e ? (b.value.push(...e), x.value.push(e), V(), X(), s("redo", Y()), s("change", Y()), !0) : !1;
	}
	function q() {
		return f.value.enableHistory && x.value.length > 0;
	}
	function J() {
		return f.value.enableHistory && S.value.length > 0;
	}
	function _e() {
		return b.value.map((e) => e.type === "point" ? {
			...e,
			point: { ...e.point }
		} : {
			...e,
			from: { ...e.from },
			to: { ...e.to }
		});
	}
	function Y() {
		return {
			empty: K(),
			strokes: b.value.length,
			hasImage: !!w.value,
			canUndo: q(),
			canRedo: J(),
			history: x.value.length,
			redo: S.value.length
		};
	}
	function ve(e, t) {
		return {
			type: "line",
			from: e,
			to: t,
			lineWidth: be(),
			color: f.value.writeColor,
			lineCap: f.value.lineCap,
			lineJoin: f.value.lineJoin
		};
	}
	function ye(e) {
		let t = m(f.value.writeWidth, p.writeWidth);
		return {
			type: "point",
			point: e,
			radius: Math.max(t / 2, 1),
			color: f.value.writeColor
		};
	}
	function be() {
		if (f.value.isSign) return m(f.value.writeWidth, p.writeWidth);
		let e = Date.now(), t = Math.max(e - I.value, 1);
		I.value = e;
		let n = m(f.value.minWriteWidth, p.minWriteWidth), r = m(f.value.maxWriteWidth, p.maxWriteWidth), i = Math.max(n, Math.min(r, n + (r - n) * t / 30));
		return L.value = L.value / 4 * 3 + i / 4, Number(L.value.toFixed(2));
	}
	function X() {
		if (!f.value.allowEmpty && K()) {
			Q();
			return;
		}
		let e = n.value;
		if (!e) {
			Q();
			return;
		}
		let t = v(e, f.value, f.value.quality);
		j.value = t, Z(t);
	}
	function Z(e) {
		s("update:modelValue", e), s("confirm", e);
	}
	function Q() {
		j.value = null, s("update:modelValue", null), s("confirm", null);
	}
	function xe() {
		if (!f.value.enableHistory || C.value.length === 0) {
			C.value = [];
			return;
		}
		x.value.push([...C.value]);
		let e = Math.max(1, Number(f.value.maxHistory) || p.maxHistory);
		x.value.length > e && x.value.shift(), S.value = [], C.value = [];
	}
	function $(e) {
		if (!f.value.enableShortcuts || document.activeElement !== n.value || ie(e.target)) return;
		let t = e.key.toLowerCase();
		if (e.metaKey || e.ctrlKey) {
			if (t === "z" && !e.shiftKey) {
				he() && e.preventDefault();
				return;
			}
			(t === "y" || t === "z" && e.shiftKey) && ge() && e.preventDefault();
		}
	}
	function Se() {
		f.value.enableResize ? Ce() : we();
	}
	function Ce() {
		ae.value ||= (window.addEventListener("resize", Te, !1), !0);
	}
	function we() {
		ae.value &&= (window.removeEventListener("resize", Te, !1), !1);
	}
	function Te() {
		R.value && clearTimeout(R.value), R.value = setTimeout(B, 100);
	}
	async function Ee() {
		let e = z.value + 1;
		z.value = e;
		let t = f.value.backgroundImage || "", n = f.value.guideImage || "", r = t !== E.value, i = n !== A.value;
		if (!r && !i) return;
		let [a, o] = await Promise.all([r ? k(t) : Promise.resolve(T.value), i ? k(n) : Promise.resolve(D.value)]);
		e === z.value && (r && (E.value = t, T.value = a), i && (A.value = n, D.value = o));
	}
	return d(() => i.options, async () => {
		f.value = O(i.options, f.value), await Ee(), B(), Se();
	}, { deep: !0 }), d(() => i.modelValue || i.image, async (e) => {
		e !== j.value && (e ? await G(e, { emit: !1 }) : U(!1));
	}), o(async () => {
		await r(), B(), Se(), await Ee(), V(), window.addEventListener("keydown", $, !1);
		let e = i.modelValue || i.image;
		e && await G(e, { emit: !1 });
	}), a(() => {
		we(), R.value && clearTimeout(R.value), window.removeEventListener("keydown", $, !1);
	}), {
		options: f,
		isDisabled: oe,
		isEmpty: K,
		getSignatureStatus: Y,
		handlePointerDown: se,
		handlePointerMove: ce,
		handlePointerUp: le,
		handlePointerCancel: ue,
		canvasClear: U,
		clear: de,
		undo: he,
		redo: ge,
		canUndo: q,
		canRedo: J,
		getStrokes: _e,
		saveAsImg: fe,
		toDataURL: W,
		downloadSignImg: pe,
		dealImage: me,
		fromDataURL: G,
		redraw: V,
		initCanvas: B
	};
}
function O(e, t = p) {
	return Object.assign({}, p, t, e || {});
}
async function k(e) {
	if (!e) return null;
	try {
		return await y(e);
	} catch {
		return null;
	}
}
function ie(e) {
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
		let a = e, o = r, l = c(null), { isDisabled: d, handlePointerDown: p, handlePointerMove: m, handlePointerUp: h, handlePointerCancel: g, canvasClear: _, clear: ee, undo: te, redo: ne, canUndo: re, canRedo: v, getStrokes: y, saveAsImg: b, toDataURL: x, downloadSignImg: S, dealImage: C, fromDataURL: w, isEmpty: T, getSignatureStatus: E, redraw: O, initCanvas: k } = D({
			canvasRef: l,
			props: a,
			emit: o
		});
		return n({
			clear: ee,
			canvasClear: _,
			undo: te,
			redo: ne,
			canUndo: re,
			canRedo: v,
			getStrokes: y,
			saveAsImg: b,
			toDataURL: x,
			downloadSignImg: S,
			dealImage: C,
			fromDataURL: w,
			isEmpty: T,
			getSignatureStatus: E,
			redraw: O,
			initCanvas: k
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
			onPointerleave: n[4] ||= f((...e) => u(g) && u(g)(...e), ["prevent", "stop"])
		}, " 您的浏览器不支持canvas技术,请升级浏览器! ", 42, A));
	}
}), [["__scopeId", "data-v-0aca3dd2"]]);
//#endregion
//#region packages/index.ts
j.install = (e) => {
	e.component("SignCanvas", j);
};
var M = j;
//#endregion
export { j as SignCanvas, M as default };
