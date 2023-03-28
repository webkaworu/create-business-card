<template>
	<div class="panel-font">
		<div class="nav justify-content-center">
			<button class="active" data-bs-toggle="tab" href="#min">明朝系</button>
			<button class="ms-2" data-bs-toggle="tab" href="#goth">ゴシック系</button>
			<button class="ms-2" data-bs-toggle="tab" href="#kai">楷書系</button>
		</div>
		<div class="tab-content mt-2">
			<div class="tab-pane fade show active" id="min">
				<button type="button" @click="changeFont('MFont', 0)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:0;" font-family="MFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('MFont', 0.1)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:0.5px;" font-family="MFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('MFont', 0.3)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:1px;" font-family="MFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('MFont', 0.5)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:1.5px;" font-family="MFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
			</div>

			<div class="tab-pane fade" id="goth">
				<button type="button" @click="changeFont('GFont', 0)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:0;" font-family="GFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('GFont', 0.1)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:0.5px;" font-family="GFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('GFont', 0.3)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:1px;" font-family="GFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('GFont', 0.5)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:1.5px;" font-family="GFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
			</div>

			<div class="tab-pane fade" id="kai">
				<button type="button" @click="changeFont('KFont', 0)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:0;" font-family="KFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('KFont', 0.1)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:0.5px;" font-family="KFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('KFont', 0.3)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:1px;" font-family="KFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
				<button type="button" @click="changeFont('KFont', 0.5)">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16">
						<text transform="matrix(1 0 0 1 0 14)" style="stroke:#333;stroke-width:1.5px;" font-family="KFont" line-height="1" font-size="16px">書体サンプル</text>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>
<script setup>
import 'bootstrap';

const props = defineProps({
	operation: Object,
});

const changeFont = (font, stroke) => props.operation.changeFont(font, stroke);
</script>
