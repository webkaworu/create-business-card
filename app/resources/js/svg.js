class Svg {

	constructor(element, textarea) {
		this.svg = element;
		this.textarea = textarea;
		this.focus = null;
		this.moving = null;
		this.offset = { x: 0, y: 0 };
		this.initialize();
	}

	initialize() {
		const textElements = this.svg.querySelectorAll('text');
		for (const textElement of textElements) {
			textElement.addEventListener('mousedown', (event)=>{
				const target = (event.target.tagName === 'text') ? event.target : event.target.closest('text');
				this.catch(event, target);
			}, false);
			textElement.addEventListener('touchstart', (event)=>{
				const target = (event.target.tagName === 'text') ? event.target : event.target.closest('text');
				this.catch(event, target);
			}, false);
			textElement.addEventListener('mousemove', (event)=>{
				this.move(event);
			}, false);
			textElement.addEventListener('touchmove', (event)=>{
				this.move(event);
			}, false);
			textElement.addEventListener('mouseup', (event)=>{
				this.release(event);
			}, false);
			textElement.addEventListener('touchend', (event)=>{
				this.release(event);
			}, false);
		}
		this.svg.addEventListener('click', (event) => {
			if (event.target != 'text' && event.target.closest('text') == null ){
				this.removeOutLine();
				this.focus = null;
			}
		});
	}

	click(element) {
		this.focus = element;
		const tspans = element.querySelectorAll('tspan');
		let text;
		if (tspans.length > 0){
			let texts = [];
			for (const tspan of tspans) {
				texts.push(tspan.textContent);
			}
			text = texts.join('\n');
		} else {
			text = element.textContent;
		}
		this.textarea.value = text;

		this.setOutLine(element);

	}

	getSVGPoint(e, element){
		const CTM = element.getScreenCTM();
		const point = new DOMPointReadOnly(e.clientX, e.clientY);
		return point.matrixTransform(CTM.inverse());
	}

	getMatrix(element) {
		const style = window.getComputedStyle(element);
		const transform = style.getPropertyValue('transform');
		return new DOMMatrix(transform);
	}

	catch(e, element) {
		this.removeOutLine();
		const event = (e.type === 'mousedown') ? e : e.changedTouches[0];
		this.focus = element;
		this.moving = element;
		const tspans = element.querySelectorAll('tspan');
		let text;
		if (tspans.length > 0) {
			let texts = [];
			for (const tspan of tspans) {
				texts.push(tspan.textContent);
			}
			text = texts.join('\n');
		} else {
			text = element.textContent;
		}
		this.textarea.value = text;

		const p = this.getSVGPoint(event, this.focus);

		this.offset.x = p.x - this.focus.getAttribute('x');
		this.offset.y = p.y - this.focus.getAttribute('y');

		event.preventDefault();
	}

	move(e) {
		if (this.moving == null) { return; }

		const event = (e.type === 'mousemove') ? e : e.changedTouches[0];
		const p = this.getSVGPoint(event, this.focus);

		const matrix = this.getMatrix(this.moving);
		const x = p.x - this.offset.x;
		const y = p.y - this.offset.y;

		// const matrix = this.moving.getCTM();
		matrix.e += x;
		matrix.f += y;
		console.log(this.getMatrix(this.moving));
		console.log(this.moving.getCTM());
		this.moving.transform.baseVal.initialize(this.moving.ownerSVGElement.createSVGTransformFromMatrix(matrix));

		// this.moving.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + (matrix.e + x) + ' ' + (matrix.f + y) +')');

		event.preventDefault();
	}

	release() {
		this.setOutLine(this.focus);
		this.moving = null;
	}

	setOutLine(element) {
		const bbox = element.getBBox();
		const transform = element.getAttribute('transform');
		const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		const atts = {
			id            : 'outline',
			width         : bbox.width,
			height        : bbox.height,
			fill          : 'none',
			stroke        : '#0000ff',
			'stroke-width': 0.2,
			x             : bbox.x,
			y             : bbox.y
		};
		if (transform != null) {
			atts['transform'] = transform;
		}
		for (const name in atts) {
			rect.setAttribute(name, atts[name]);
		}
		this.removeOutLine();
		this.svg.append(rect);
	}

	removeOutLine() {
		const outline = this.svg.querySelector('#outline');
		if (outline != null) {
			outline.remove();
		}
	}

}

export default Svg;
