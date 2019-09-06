precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute vec4 orientation;
attribute vec3 scale;

varying vec4 vColor;

vec3 applyQuaternionToVector( vec4 q, vec3 v ){

	return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );

}

void main() {

	
	vColor = vec4 (1.0,1.0,1.0,1.0);
	
	vec3 vPosition = applyQuaternionToVector( orientation, position*scale );
	gl_Position = projectionMatrix * modelViewMatrix * vec4( offset + vPosition, 1.0 );

}