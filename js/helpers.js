function drawTree(data, depth){
    var st = new $jit.ST({  
        injectInto: 'plot', 
        orientation: 'top', 
        duration: 700,  
        transition: $jit.Trans.Quart.easeInOut,  
        levelDistance: 30,  
        subtreeOffset: 5,  
        siblingOffset: 5,
        constrained: false,
        levelsToShow: depth,
        offsetY: Math.floor($('#plot').height() / 2) - 40,

        Navigation: {  
          enable:true,  
          panning:true  
        },  

        Node: {  
            height: 25,  
            width: 46,  
            type: 'rectangle',
            color: '#aaa',  
            overridable: true  
        },  
          
        Edge: {  
            type: 'bezier',  
            overridable: true  
        },
        
        onCreateLabel: function(label, node){  
            label.id = node.id;              
            if (! node.data.root){
            	label.innerHTML = '<b>' + node.name + '</b>' + '<small>' + node.data.bs + '</small>';
            }
            label.onclick = function(){  
		        //st.onClick(node.id);  
		    };  
        },
        
         onBeforePlotNode: function(node){  
		    if (node.data.root) {
		        node.data.$type = "ellipse";
		        node.data.$width = 7;
		        node.data.$height = 7;
		    }

		    var n = parseInt(node.name);
		    if (!isNaN(n)){
		    	var step = Math.floor(n * 255/(depth-1));
		    	var blue = 255 - step;
		    	var red = step;
		    	node.data.$color='rgb('+red.toString()+',0,'+blue.toString()+')';
		    }
		},  
    }); 
    
    st.loadJSON(data);  
    st.compute();  
    st.onClick(st.root);  
}
