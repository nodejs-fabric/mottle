var divs  =[],
	_add = function(id) {
		var d = document.createElement("div");
		d.setAttribute("id", id);
		divs.push(d);
		document.body.appendChild(d);
		return d;
	},
	_clear = function() {
		for (var i = 0; i < divs.length; i++) {
			try {
				divs[i].parentNode.removeChild(divs[i]);
			}
			catch (e) { }
		}
		divs.length = 0;
		//m.reset();
	},
	m;

var testSuite = function() {
	
	module("Mottle", {
		teardown: _clear,
		setup:function() {
            m = new Mottle();
		}
	});
    
    test("bind a click and trigger one, no original event", function() {
        var d = _add("d1");
		var a = null;
		m.on(d, "click", function() { a = "done"; });
		m.trigger(d, "click");
		equal(a, "done", "click event was registered and triggered");
    });
	
	test("bind a click, two elements in array, and trigger one, no original event", function() {
        var d = _add("d1"), d2 = _add("d2");
		var a = null;
		m.on([d, d2], "click", function() { a = "done"; });
		m.trigger(d, "click");
		equal(a, "done", "click event was registered and triggered");
		a = null;
		m.trigger(d2, "click");
		equal(a, "done", "click event was registered and triggered");
    });
	
	test("bind a click by id, trigger event, no original event", function() {
        var d = _add("d1");
		var a = null;
		m.on("#d1", "click", function() { a = "done"; });
		m.trigger("#d1", "click");
		equal(a, "done", "click event was registered and triggered");
    });
	
	test("trigger by selector", function() {
        var d = _add("d1"), d2 = _add("d2");
		d.className = "foo";
		d2.className = "foo";
		var a = 0;
		m.on([d, d2], "click", function() { a++; });
		m.trigger(document.querySelectorAll(".foo"), "click");
		equal(a, 2, "click event was registered and triggered on both elements");
    });
	
	test("bind and trigger by selector", function() {
        var d = _add("d1"), d2 = _add("d2");
		d.className = "foo";
		d2.className = "foo";
		var a = 0, fooDivs = document.querySelectorAll(".foo");
		m.on(fooDivs, "click", function() { a++; });
		m.trigger(fooDivs, "click");
		equal(a, 2, "click event was registered and triggered on both elements");
    });
	
	test("bind a click and delete the element, then unbind", function() {
        var d = _add("d1");
		var a = 0;
		var f = function() { a++; };
		m.on(d, "click", f);
		m.trigger(d, "click");
		equal(a, 1, "event was fired");
		m.trigger(d, "click");
		equal(a, 2, "event was fired again");
		m.off(d, "click", f);
		m.trigger(d, "click");
		equal(a, 2, "event was not fired again after unbind");
		
    });
	
	test("bind a click and delete the element, then unbind", function() {
        var d = _add("d1");
		var a = null;
		var f = function() { a = "done"; };
		m.on(d, "click", f);
		d.parentNode.removeChild(d);
		try {
			// get element; it has been removed and is now null.
			// i could of course just pass null in here ....
			var dd = document.getElementById("d1");
			m.off(dd, "click", f);
			ok(true, "unbind should not throw an error");
		}
		catch (e) {
			ok(false, "unbind should not throw an error");
		}
    });
	
	test("bind to a null element", function() {
		expect(1);
		m.on(null, "dblclick", function() {
			
		});
		ok(true, "bind to null did not fail");
	});
	
	test("bind a null function", function() {
		expect(1);
		var d = _add("d1");
		m.on(d, "click", null);
		ok(true, "bind with null function did not fail");
	});
	
	test("unbind a null function", function() {
		expect(1);
		var d = _add("d1");
		m.on(d, "click", function() {});
		m.off(d, "click", null);
		ok(true, "unbind with null function did not fail");
	});
	
	test("bind and remove using Mottle, element as arg", function() {
        var d = _add("d1")
		var a = 0;
		m.on(d, "click", function() { a++; });
		m.remove(d);
		ok(d.parentNode == null, "div was removed from the dom");
		m.trigger(d, "click");
		ok(a == 0, "event was not fired");
    });
	
	
	
};