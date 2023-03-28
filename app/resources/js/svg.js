import { BigNumber } from 'bignumber.js';

class Svg {

	constructor(element, textarea) {
		this.focus = null;
		this.moving = null;
		this.offset = { x: 0, y: 0 };
		this.initialMatrix = null;
		this.range = 0;
		this.advance = 0;
		this.font = { size: 7, space: 100, line: 100, anchor: 'start' };
		if (element && textarea) {
			this.initialize(element, textarea);
		}
	}

	increment(){
		return this.font;
	}

	reproduce(element, textarea){
		const storage = JSON.parse(sessionStorage.getItem('svg'));
		if (storage != null && storage.length > 0) {
			this.advance = storage.length - 1;
			this.range = storage.length - 1;
			element.innerHTML = storage[this.range];
		}
		this.initialize(element, textarea);
	}

	initialize(element, textarea) {
		this.svg = element;
		this.textarea = textarea;

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
		}
		this.svg.addEventListener('click', (event) => {
			if (event.target.tagName != 'text' && event.target.closest('text') == null ){
				this.removeOutLine();
				this.textarea.value = '';
				this.focus = null;
			}
		});
		this.svg.addEventListener('mousemove', (event) => {
			this.move(event);
		});
		this.svg.addEventListener('touchmove', (event) => {
			this.move(event);
		});
		document.addEventListener('mouseup', (event) => {
			this.release(event);
		});
		document.addEventListener('touchend', (event) => {
			this.release(event);
		});

		this.save();
	}

	catch(e, element) {
		e.preventDefault();

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

		this.setFont();

		this.offset.x = event.clientX;
		this.offset.y =  event.clientY;

		this.initialMatrix = element.transform.baseVal.consolidate().matrix;

	}

	move(e) {
		if (this.moving == null) { return; }

		e.preventDefault();

		const event = (e.type === 'mousemove') ? e : e.changedTouches[0];

		const bbox = this.svg.getBBox();
		const rect = this.svg.getBoundingClientRect();

		const dx = (event.clientX - this.offset.x) * (bbox.width / rect.width);
		const dy = (event.clientY - this.offset.y) * (bbox.width / rect.width);
		const matrix = this.initialMatrix.translate(dx, dy);

		this.moving.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + matrix.e + ' ' + matrix.f +')');

	}

	release() {
		if ( this.moving != null ){
			this.save();
		}
		this.moving = null;
		if (this.focus != null) {
			this.setOutLine(this.focus);
		}
	}

	position(pos) {
		if (this.focus == null) { return; }

		const bbox = this.svg.getBBox();

		const matrix = this.focus.transform.baseVal.consolidate().matrix;
		const fbox = this.focus.getBBox();
		let dx, dy;
		switch (pos) {
		case 'left':
			dx = 5 - fbox.x;
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + dx + ' ' + matrix.f +')');
			break;
		case 'center':
			dx = bbox.width / 2 - fbox.width / 2 - fbox.x;
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + dx + ' ' + matrix.f +')');
			break;
		case 'right':
			dx = bbox.width - fbox.width - 5;
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + dx + ' ' + matrix.f +')');
			break;
		case 'bottom':
			dy = bbox.height - fbox.y - fbox.height - 5;
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + matrix.e + ' ' + dy +')');
			break;
		case 'middle':
			dy = bbox.height / 2 - fbox.height / 2 - fbox.y;
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + matrix.e + ' ' + dy +')');
			break;
		case 'top':
			dy = 5 - fbox.y;
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + matrix.e + ' ' + dy +')');
			break;
		}

		this.save();
	}

	delete() {
		if (this.focus == null) { return; }

		this.focus.remove();
		this.textarea.value = '';
		this.focus = null;

		this.save();
	}

	paging(state) {
		const storage = JSON.parse(sessionStorage.getItem('svg'));
		if (storage == null){
			return;
		}

		switch (state){
		case 'next':
			if (this.advance < this.range){
				this.advance++;
				this.svg.innerHTML = storage[this.advance - 1];
				this.focus = null;
				this.textarea.value = '';
				this.initialize(this.svg, this.textarea);
			}
			break;
		case 'prev':
			if (this.advance > 1){
				this.advance--;
				this.svg.innerHTML = storage[this.advance - 1];
				this.focus = null;
				this.textarea.value = '';
				this.initialize(this.svg, this.textarea);
			}
			break;
		}
	}

	setFont(){
		if (this.focus == null) { return; }
		const style = window.getComputedStyle(this.focus);
		let size = (this.focus.getAttribute('font-size') != null) ? parseFloat(this.focus.getAttribute('font-size')) : parseFloat(style.getPropertyValue('font-size'));
		size = new BigNumber(parseFloat(size)).div(0.5).decimalPlaces(0, 3).times(0.5).toNumber();

		const tspans = this.focus.querySelectorAll('tspan');

		let space = 100;
		let w, length=0;
		if (tspans.length > 0) {
			let current = 0;
			tspans.forEach((tspan, i) => {
				if (tspan.textContent.length > length){
					current = i;
				}
			});
			if (tspans[current].getAttribute('textLength') != null) {
				w = parseFloat(tspans[current].getAttribute('textLength'));
				length = tspans[current].textContent.length;
				space = new BigNumber(parseFloat(w)).minus(length).div(length - 1).plus(1).times(100).decimalPlaces(0, 3).toNumber();
			}
		} else {
			if (this.focus.getAttribute('textLength') != null){
				w = parseFloat(this.focus.getAttribute('textLength'));
				length = this.focus.textContent.length;
				space = new BigNumber(parseFloat(w)).minus(length).div(length - 1).plus(1).times(100).decimalPlaces(0, 3).toNumber();
			}
		}

		let line = 100;
		if (tspans.length > 1) {
			const tsy = tspans[1].getAttribute('y');
			if (Math.floor(size) != Math.abs(tsy)) {
				line += Math.floor(Math.abs(tsy) - size);
			}
		}

		let anchor = 'start';
		if (tspans.length > 1) {
			const tsanchor = tspans[0].getAttribute('text-anchor');
			if (tsanchor != null) {
				anchor = tsanchor;
			}
		}

		this.font = {
			size  : size,
			space : space,
			line  : line,
			anchor: anchor
		};
	}

	changeSize(num) {
		if (this.focus == null) { return this.font; }

		let size = new BigNumber(this.font.size).plus(num).toNumber();

		if (size < 4){
			size = 4;
		}
		this.focus.setAttribute('font-size', size);

		const tspans = this.focus.querySelectorAll('tspan');
		if (tspans.length > 1) {
			const tsy = tspans[1].getAttribute('y');
			let line = new BigNumber(tsy).plus(num).decimalPlaces(1, 3).toNumber();
			if (line < size) {
				line = size;
			}
			tspans.forEach((tspan, i) => {
				if (i > 0) {
					const plus = line * i;
					tspan.setAttribute('y', plus);
				}
			});
		}

		this.setFont();
		this.save();
		return this.font;
	}

	changeSpace(num) {
		if (this.focus == null) { return this.font; }

		const tspans = this.focus.querySelectorAll('tspan');

		let space = this.font.space + num;
		let w, length = 0;
		if (tspans.length > 0) {
			this.focus.removeAttribute('textLength');
			if (this.font.anchor == 'justify'){
				let current = 0;
				tspans.forEach((tspan, i) => {
					if (tspan.textContent.length > length) {
						current = i;
					}
				});
				length = tspans[current].textContent.length;
				w = new BigNumber(space).div(100).minus(1).times(length - 1).plus(length).toNumber();
				if (w < 1){
					w = 1;
				}
				tspans.forEach((tspan) => {
					tspan.setAttribute('textLength', w + 'em');
				});
			} else {
				tspans.forEach((tspan) => {
					length = tspan.textContent.length;
					w = new BigNumber(space).div(100).minus(1).times(length - 1).plus(length).toNumber();
					if (w < 1) {
						w = 1;
					}
					tspan.setAttribute('textLength', w + 'em');
				});
			}
		} else {
			length = this.focus.textContent.length;
			w = new BigNumber(space).div(100).minus(1).times(length - 1).plus(length).toNumber();
			if (w < 1) {
				w = 1;
			}
			this.focus.setAttribute('textLength', w +'em');
		}

		this.setFont();
		this.save();
		return this.font;
	}

	changeLine(num) {
		if (this.focus == null) { return this.font; }

		const tspans = this.focus.querySelectorAll('tspan');
		if (tspans.length > 1) {
			const tsy = tspans[1].getAttribute('y');
			let line = new BigNumber(tsy).plus(num).decimalPlaces(0, 3).toNumber();
			if (line < this.font.size){
				line = this.font.size;
			}
			tspans.forEach((tspan, i) => {
				if (i > 0) {
					const plus = line * i;
					tspan.setAttribute('y', plus);
				}
			});
		}

		this.setFont();
		this.save();
		return this.font;
	}

	changeAnchor(state) {
		if (this.focus == null) { return this.font; }
		const tspans = this.focus.querySelectorAll('tspan');
		if (tspans.length > 1) {
			const matrix = this.focus.transform.baseVal.consolidate().matrix;
			const fbox = this.focus.getBBox();
			let dx = matrix.e;
			switch (state) {
			case 'start':
				tspans.forEach((tspan) => {
					tspan.removeAttribute('text-anchor');
				});
				if ( this.font.anchor == 'middle' ){
					dx = matrix.e - (fbox.width / 2);
				} else if (this.font.anchor == 'end') {
					dx = matrix.e - fbox.width;
				}
				break;
			case 'middle':
				tspans.forEach((tspan) => {
					tspan.setAttribute('text-anchor', 'middle');
				});
				if (this.font.anchor == 'start' || this.font.anchor == 'justify') {
					dx = matrix.e + (fbox.width / 2);
				} else if (this.font.anchor == 'end') {
					dx = matrix.e - (fbox.width / 2);
				}
				break;
			case 'end':
				tspans.forEach((tspan) => {
					tspan.setAttribute('text-anchor', 'end');
				});
				if (this.font.anchor == 'start' || this.font.anchor == 'justify') {
					dx = matrix.e + fbox.width;
				} else if (this.font.anchor == 'middle') {
					dx = matrix.e + (fbox.width / 2);
				}
				break;
			case 'justify':
				tspans.forEach((tspan) => {
					tspan.setAttribute('text-anchor', 'justify');
				});
				if (this.font.anchor == 'middle') {
					dx = matrix.e - (fbox.width / 2);
				} else if (this.font.anchor == 'end') {
					dx = matrix.e - fbox.width;
				}
				break;
			}
			this.focus.setAttribute('transform', 'matrix(' + matrix.a + ' ' + matrix.b + ' ' + matrix.c + ' ' + matrix.d + ' ' + dx + ' ' + matrix.f + ')');
		}

		this.setFont();
		return this.changeSpace(0);
	}

	addText() {
		const value = this.textarea.value.trim();
		if (value == '' ){
			return;
		}
		const values = value.split('\n');
		const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.setAttribute('transform', 'matrix(1, 0, 0, 1, 10, 10)');
		text.setAttribute('font-size', '6');
		text.setAttribute('font-family', '\'GFont\'');
		if (values.length > 1 ){
			let tspan;
			values.forEach((val, i) => {
				tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
				tspan.setAttribute('x', 0);
				tspan.setAttribute('y', i * 6);
				tspan.textContent = val;
				text.append(tspan);
			});
		} else {
			text.textContent = value;
		}

		text.addEventListener('mousedown', (event) => {
			const target = (event.target.tagName === 'text') ? event.target : event.target.closest('text');
			this.catch(event, target);
		}, false);
		text.addEventListener('touchstart', (event) => {
			const target = (event.target.tagName === 'text') ? event.target : event.target.closest('text');
			this.catch(event, target);
		}, false);

		this.svg.append(text);
		this.save();
	}

	changeText() {
		if (this.focus == null) { return; }
		const value = this.textarea.value.trim();
		if (value == '') {
			return;
		}

		let tspans = this.focus.querySelectorAll('tspan');
		if (tspans.length) {
			tspans = Array.from(tspans);
		}

		const values = value.split('\n');
		if (values.length > 1) {
			let y = this.font.size;
			if ( tspans.length > 1 ){
				y = tspans[1].getAttribute('y');
			}
			if (tspans.length > values.length) {
				tspans = tspans.slice(0, values.length);
			}
			this.focus.innerHTML = '';
			values.forEach((val, i) => {
				const tspan = (i in tspans)? tspans[i]: document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
				tspan.setAttribute('x', 0);
				tspan.setAttribute('y', i * y);
				tspan.textContent = val;
				this.focus.append(tspan);
			});
		} else {
			this.focus.textContent = value;
		}

		this.changeSpace(0);
		const anchor = this.font.anchor;
		this.changeAnchor(anchor);
	}

	changeFont(font, stroke) {
		if (this.focus == null) { return; }

		let color = this.focus.getAttribute('fill');
		if (color == null){
			color = '#333';
		}
		this.focus.setAttribute('font-family', font);
		this.focus.setAttribute('stroke-width', stroke);
		this.focus.setAttribute('stroke', color);

		this.save();
	}

	changeColor(color) {
		if (this.focus == null) { return; }

		let stroke = this.focus.getAttribute('stroke-width');
		if (stroke == null){
			stroke = 0;
		}
		this.focus.setAttribute('stroke-width', stroke);
		this.focus.setAttribute('stroke', color);
		this.focus.setAttribute('fill', color);

		this.save();
	}

	save() {
		this.removeOutLine();

		this.range = this.advance;

		let storage = JSON.parse(sessionStorage.getItem('svg'));
		if (storage == null){
			storage = [];
		} else if (this.range in storage){
			storage.splice(this.range);
		}
		storage[this.range] = this.svg.innerHTML;
		sessionStorage.setItem('svg', JSON.stringify(storage));
		this.range++;
		this.advance = this.range;
		if (this.focus != null) {
			this.setOutLine(this.focus);
		}
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
