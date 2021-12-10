
// Notes 
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer 
import circleRenderer from './radialRayMonoRenderer.js'
import circleGridRenderer from './renderCircleGrid.js'
import circleCenterRenderer from './renderCircleCenter.js'
import verticalBarsRenderer from './verticalBarRenderer.js'
import verticalBarsMonoRenderer from './verticalBarsMonoRenderer.js'
import radialRayRenderer from './radialRayRenderer.js'
import chrisRenderer from './chrisRenderer.js'


// --------------------------------------------------------
// Canvas

// Get reference to the canvas context for use by the 
// renderers below
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// ----------------------------------------------------------
// Buttons 
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})


// --------------------------------------------------------
// Audio setup

// Define some variables 
let analyser
let frequencyArray
let audio

// Starts playing the audio
function startAudio() {
	// make a new Audio Object
	audio = new Audio()
	// Get a context 
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	// Define a source sound file 
	audio.src = 'bird-whistling-a.wav'

	// Make a new analyser
	analyser = audioContext.createAnalyser()
	// Connect the analyser and the audio
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	// dataArray
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	// console.log(frequencyArray.length)
	
	// Start playing the audio
	audio.play()

	// render = animate
	requestAnimationFrame(render)
}


// This function renders the audio to the canvas using a renderer
function render() {
	// Get the audio data
	analyser.getByteFrequencyData(frequencyArray)

	// Chris' Renderer
	chrisRenderer(frequencyArray, ctx, 1000, 1000)

	// Example Renderers 
	// radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// verticalBarsMonoRenderer(frequencyArray, ctx, 12, 300, 300)
	// verticalBarsRenderer(frequencyArray, ctx, 300, 300)
	// circleCenterRenderer(frequencyArray, ctx, centerX, centerY)
	// circleGridRenderer(frequencyArray, ctx, 300, 300)
	// circleRenderer(frequencyArray, ctx, centerX, centerY, radius)

	// Set up the next animation frame
	requestAnimationFrame(render)
}

