<template>
	<Head title="編集" />
	<section class="container edit-section mb-4">
		<div class="d-md-flex">
			<div class="control-area">
				<PanelControl @changeGridEvent="GridEvent" :grid="grid" />
			</div>
			<div class="edit-area">
				<div class="canvas">
					<div class="svg" ref="svg" v-html="card"></div>
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
						<div class="tab-pane fade show active" id="menu1" ref="textarea"><PanelText /></div>
						<div class="tab-pane fade" id="menu2"><PanelFont /></div>
						<div class="tab-pane fade" id="menu3"><PanelColor /></div>
					</div>
					<div class="col-md-6 common-area order-md-1">
						<div class="change-size">
							<button type="button" data-size="-5" title="5pt縮小">字小</button>
							<button type="button" data-size="-2" title="2pt縮小">&lt;&lt;</button>
							<button type="button" data-size="-0.5" title="0.5pt縮小">&lt;</button>
							<span id="t_size_stat">7</span>pt
							<button type="button" data-size="0.5" title="0.5pt拡大">&gt;</button>
							<button type="button" data-size="2" title="2pt拡大">&gt;&gt;</button>
							<button type="button" data-size="5" title="5pt拡大">字大</button>
						</div>
						<div class="mt-2 change-space">
							<button type="button" data-space="-5" title="5%縮小">字送り小</button>
							<button type="button" data-space="-1" title="1%縮小">&lt;</button>
							<span id="t_space_stat">100</span>%
							<button type="button" data-space="1" title="1%拡大">&gt;</button>
							<button type="button" data-space="5" title="5%拡大">字送り大</button>
						</div>
						<div class="mt-2 change-line">
							<button type="button" data-line="-5" title="5%縮小">行間小</button>
							<button type="button" data-line="-1" title="1%縮小">&lt;</button>
							<span id="t_line_stat">100</span>%
							<button type="button" data-line="1" title="1%拡大">&gt;</button>
							<button type="button" data-line="5" title="5%拡大">行間大</button>
						</div>
						<div class="mt-2 change-align">
							<label><input type="radio" name="align" value="l" checked="">左揃</label>
							<label class="ms-2"><input type="radio" name="align" value="c">中揃</label>
							<label class="ms-2"><input type="radio" name="align" value="r">右揃</label>
							<label class="ms-2"><input type="radio" name="align" value="j">均等割付</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center mt-4">
			<div class="col-md-4">
				<Link :href="route('confirm')" class="btn btn-lg btn-success d-block w-100">確認する</Link>
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

defineProps({
	card: String,
});

const grid = reactive({switch: 'off', x: 0, y: 0, width: 10, height: 10 });
const GridEvent = (newGrid) => {
	Object.assign(grid, newGrid);
};

const svg = ref(null);
const textarea = ref(null);
onMounted(() => {
	const operation = new Svg(svg.value.querySelector('svg'), textarea.value.querySelector('textarea'));
	console.log(operation);
	console.log(svg.value.querySelector('svg'));
	console.log(textarea.value.querySelector('textarea'));
});
</script>
