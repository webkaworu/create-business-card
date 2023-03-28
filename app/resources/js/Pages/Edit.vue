<template>
	<Head title="編集" />
	<section class="container edit-section mb-4">
		<div class="d-md-flex">
			<div class="control-area">
				<PanelControl @changeGridEvent="GridEvent" :grid="grid" :operation="operation" />
			</div>
			<div class="edit-area">
				<div class="canvas">
					<div class="svg" ref="svg" v-html="card" @click="incrementRewrite"></div>
					<div class="grid" :class="{ 'd-none': grid.switch == 'off' }">
						<Grid :x="grid.x" :y="grid.y" :width="grid.width" :height="grid.height" />
					</div>
				</div>
			</div>
		</div>
		<div class="mt-2 font-panel">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link active" data-bs-toggle="tab" href="#menu1">文字編集</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-bs-toggle="tab" href="#menu2">フォント</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-bs-toggle="tab" href="#menu3">カラー</a>
				</li>
			</ul>
			<div class="content">
				<div class="row">
					<div class="col-md-6 tab-content order-md-2">
						<div class="tab-pane fade show active" id="menu1" ref="textarea"><PanelText :operation="operation" /></div>
						<div class="tab-pane fade" id="menu2"><PanelFont :operation="operation" /></div>
						<div class="tab-pane fade" id="menu3"><PanelColor :operation="operation" /></div>
					</div>
					<div class="col-md-6 common-area order-md-1">
						<div class="change-size">
							<button type="button" title="5pt縮小" @click="changeSize(-5)">字小</button>
							<button type="button" title="2pt縮小" @click="changeSize(-2)">&lt;&lt;</button>
							<button type="button" title="0.5pt縮小" @click="changeSize(-0.5)">&lt;</button>
							<span>{{ font.size }}</span>pt
							<button type="button" title="0.5pt拡大" @click="changeSize(0.5)">&gt;</button>
							<button type="button" title="2pt拡大" @click="changeSize(2)">&gt;&gt;</button>
							<button type="button" title="5pt拡大" @click="changeSize(5)">字大</button>
						</div>
						<div class="mt-2 change-space">
							<button type="button" title="5%縮小" @click="changeSpace(-5)">字送り小</button>
							<button type="button" title="1%縮小" @click="changeSpace(-1)">&lt;</button>
							<span>{{ font.space }}</span>%
							<button type="button" title="1%拡大" @click="changeSpace(1)">&gt;</button>
							<button type="button" title="5%拡大" @click="changeSpace(5)">字送り大</button>
						</div>
						<div class="mt-2 change-line">
							<button type="button" title="5%縮小" @click="changeLine(-5)">行間小</button>
							<button type="button" title="1%縮小" @click="changeLine(-1)">&lt;</button>
							<span>{{ font.line }}</span>%
							<button type="button" title="1%拡大" @click="changeLine(1)">&gt;</button>
							<button type="button" title="5%拡大" @click="changeLine(5)">行間大</button>
						</div>
						<div class="mt-2 change-align">
							<label>
								<input type="radio" name="anchor" value="start" :checked="font.anchor == 'start'" @change="changeAnchor('start')">左揃
							</label>
							<label class="ms-2">
								<input type="radio" name="anchor" value="middle" :checked="font.anchor == 'middle'" @change="changeAnchor('middle')">中揃
							</label>
							<label class="ms-2">
								<input type="radio" name="anchor" value="end" :checked="font.anchor == 'end'" @change="changeAnchor('end')">右揃
							</label>
							<label class="ms-2">
								<input type="radio" name="anchor" value="justify" :checked="font.anchor == 'justify'" @change="changeAnchor('justify')">均等割付
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center mt-4">
			<div class="col-md-4">
				<Link :href="route('confirm', { 'card': card_number })" class="btn btn-lg btn-success d-block w-100">確認する</Link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
import { ref, reactive, onMounted } from 'vue';
import PanelControl from "~/Components/PanelControl.vue";
import PanelText from "~/Components/PanelText.vue";
import PanelFont from "~/Components/PanelFont.vue";
import PanelColor from "~/Components/PanelColor.vue";
import Grid from "~/Svg/Grid.vue";
import 'bootstrap';
import Svg from  '~/svg';

let props = defineProps({
	card: String
});

const params = new URLSearchParams(window.location.search);
const card_number = params.get('card');

const grid = reactive({switch: 'off', x: 0, y: 0, width: 10, height: 10 });
const GridEvent = (newGrid) => {
	Object.assign(grid, newGrid);
};

const svg = ref(null);
const textarea = ref(null);
const operation = new Svg();
const font = reactive({ ...operation.font });
const incrementRewrite = () => {
	Object.assign(font, operation.increment());
};
onMounted(() => {
	operation.reproduce(svg.value.querySelector('svg'), textarea.value.querySelector('textarea'));
});

const changeSize = (num) => Object.assign(font, operation.changeSize(num));
const changeSpace = (num) => Object.assign(font, operation.changeSpace(num));
const changeLine = (num) => Object.assign(font, operation.changeLine(num));
const changeAnchor = (state) => Object.assign(font, operation.changeAnchor(state));

</script>
