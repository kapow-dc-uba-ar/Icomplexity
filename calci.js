/**
 * B = Length of longest backwards repetition
 * O = Number of occurrences of longest backwards repetitions
 * D = Distance to previous instance of longest backwards repetition
 */
function bod(s, i) {
	var len = 0;
	var distance = 0;
	var occurrences = 1;

	if (i > 0){
		for(var j = i-1; j >= len-1; j--) {
			if (s.substr(j-len+1, len) != s.substr(i-len+1, len)){
				continue;
			}
		
			while (s.charAt(i-len) == s.charAt(j-len)){
				len++;
				occurrences = 1;
				distance = i - j;
			}

			if (len > 0){
				occurrences++;
			}
		}
	}
	
	return {
		b: len,
		o: occurrences,
		d: distance
	};
}

function expectedNextBs(s, a){
	for (var n = 0; Math.pow(a, n+1) + n <= s.length; n++);
	return n;
}

function allVars(s, a){
	var res = {b:[], o:[], d:[], eb:[], eo:[]}
	for (var i = 0; i < s.length; i++){
		var bod_i = bod(s, i);

		//B, O, D
		res.b.push(bod_i.b);
		res.o.push(bod_i.o);
		res.d.push(bod_i.d);
		
		//EB, EO
		var eb = 0;
		var eo = 0;
		var prefix = s.substring(0, i);
		
		for (var j = 0; j < a; j++){
			if (s[i] == j.toString()) continue;
			var alt = bod(prefix + j.toString(), i);

			if (alt.b < bod_i.b){
				eb = 0;
				eo = 0;
				break;
			}
			
			if (alt.b == bod_i.b){
				eb = 1;
				if (alt.o == bod_i.o){
					eo = 1;
				}
			}
		}
		
		res.eb.push(eb);
		res.eo.push(eo)
	}
	
	return res;
}


function b(s, i) {
	mr = 0;
	for(j=i;j>mr;--j) {
		if (s.substr(j-mr,mr)!=s.substr(i-mr+1,mr)) continue;
		while (s.charAt(i-mr) == s.charAt(j-mr-1)) ++mr;
	}
	return mr;
}
function calcBs(s) {
	r = "[";
	for(i=0;i<s.length;i++) r += " " + b(s, i);
	return r + " ]";
}
function oc(s, i) {
	len = b(s, i);
	r = 0;
	for(j=0;j<=s.length-len;++j) if (s.substr(j,len) == s.substr(i-len+1,len)) r++;
	return r;
}
function calcOs(s) {
	r = "[";
	for(i=0;i<s.length;i++) r += " " + oc(s, i);
	return r + " ]";
}
function boc(s, i) {
	len = b(s, i);
	r = 0;
	for(j=0;j<=i-len+1;++j) if (s.substr(j,len) == s.substr(i-len+1,len)) r++;
	return r;
}
function calcBOs(s) {
	r = "[";
	for(i=0;i<s.length;i++) r += " " + boc(s, i);
	return r + " ]";
}
function calcAs(s) {
	a = 0;
	for(i=0;i<s.length;i++) if (s.substr(i+1).indexOf(s.charAt(i)) == -1) a++;
	return a;
}
function dlog(x, b) {
	return Math.log(1.+1./x)/Math.log(b);
}
function calcIs(s,a) {
	r = 0.;
	for(i=0;i<s.length;i++) r += dlog(b(s, i)+1, a);
	return r;
}
function calcLZParse(s) {
	r = "";
	for(i=0;i<s.length;) {
		li=i;
		++i;
		while(i<=s.length && s.substring(0,i-1).indexOf(s.substring(li,i)) > -1) ++i;
		r += s.substring(li,i);
		if (i<=s.length) r += " . ";
	}
	return r;
}
function calcLZ(s) {
	p = calcLZParse(s);
	return p.substr(0,p.length-1).split(" . ").length;
}
