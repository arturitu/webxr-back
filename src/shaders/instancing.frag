precision highp float;

uniform float fogNear;
uniform float fogFar;

uniform vec3 fogColor;
varying vec3 vPosition;
varying vec4 vColor;

void main() {

	vec4 color = vec4( vColor );
	gl_FragColor = color;

	float depth = gl_FragCoord.z / gl_FragCoord.w;
	float fogFactor = smoothstep( fogNear, fogFar, depth );
	gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

}