<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
		<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="robots" content="noindex,nofollow">
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
				@vite(['resources/scss/app.scss', 'resources/js/app.js'])
				@inertiaHead
				@routes
		</head>
		<body>
				@inertia
		</body>
</html>
