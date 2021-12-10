// *************************************************************
// Draw Outside In Renderer
// This draws lines out from the center circle
function render(frequencyArray, ctx, width, height) {
	// Clear the canvas
	ctx.fillStyle = 'rgb(51, 51, 51)'
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

	// calculate the number of lines and the step between each line
	const bars = frequencyArray.length 
	// const step = width / bars
	const step = 360 / bars
  ctx.lineWidth = 1
	

  // Draw the lines
  // f = frequency
  // i = index
	frequencyArray.forEach((f, i) => {
    // Calculate the angle of the line
        const startX = f / 255 * width;
        const startY = f / 255 * height;
        // Start drawing the line
        ctx.beginPath();
        // Set the color of the line
        
        ctx.strokeStyle = `hsl(${step * i}, 100%, 50%)`
        
        // Top left to Bottom right
        ctx.strokeRect(startX, startY, (width / 8), (height / 8))

        ctx.strokeRect(startX+250, startY, (width / 9), (height / 9))
        ctx.strokeRect(startX+500, startY, (width / 10), (height / 10))
        ctx.strokeRect(startX+750, startY, (width / 11), (height / 11))

        ctx.strokeRect(startX , startY+250, (width / 9), (height / 9))
        ctx.strokeRect(startX , startY+500, (width / 10), (height / 10))
        ctx.strokeRect(startX , startY+750, (width / 11), (height / 11))
        ctx.stroke()
	})
}

export default render
