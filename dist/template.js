this["minesweeper"] = this["minesweeper"] || {};
this["minesweeper"]["prototype"] = this["minesweeper"]["prototype"] || {};
this["minesweeper"]["prototype"]["templates"] = this["minesweeper"]["prototype"]["templates"] || {};

Handlebars.registerPartial("settings", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"row settings-panel settings-panel-hidden\">\n		<div class=\"col-xs-4\">\n			<label for=\"mine-count\">Mine Count: </label>\n			<input type=\"number\" id=\"mine-count\" class=\"mine-count\">  \n		</div>\n		<div class=\"col-xs-4\">\n			<label for=\"board-width\">Board Width: </label>\n			<input type=\"number\" id=\"mine-count\" class=\"board-width\">  \n		</div>\n		<div class=\"col-xs-4\">\n			<label for=\"board-height\">Board Height: </label>\n			<input type=\"number\" id=\"mine-count\" class=\"board-height\">  \n		</div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("toolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"toolbar row\">\n	<div class=\"col-xs-8 remaining\">\n		Remaining: <span class=\"remaining-val\"></span>\n	</div>\n	<div class=\"col-xs reset\" title=\"reset\">\n		&#x27f3;\n	</div>\n	<div class=\"col-xs settings\" title=\"settings\">\n		&#x2699;\n	</div>\n	<div class=\"col-xs help\" title=\"help\">\n		?\n	</div>\n</div>";
},"useData":true}));

this["minesweeper"]["prototype"]["templates"]["board"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"row\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "				<div class=\"game-space "
    + this.escapeExpression(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + " col-xs\">\n					<div class=\"content\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.bomb : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "					</div>\n				</div>\n";
},"3":function(depth0,helpers,partials,data) {
    return "							&#128163\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "							"
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["minesweeper"]["prototype"]["templates"]["game"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mine\">\n"
    + ((stack1 = this.invokePartial(partials.toolbar,depth0,{"name":"toolbar","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = this.invokePartial(partials.settings,depth0,{"name":"settings","data":data,"indent":"\t","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "	<div class=\"board-wrap\">\n		<div class=\"gameboard\">\n\n		</div>\n		<div class=\"screen\">\n\n		</div>\n	</div>\n</div>";
},"usePartial":true,"useData":true});