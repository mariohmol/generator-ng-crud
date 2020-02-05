<% entities.forEach(function (entity) {%>
export { <%= entity.capitalize %> } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>.component';
export { <%= entity.capitalize %>Create } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>Create.component';
export { <%= entity.capitalize %>Edit } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>Edit.component';
export { <%= entity.capitalize %>Delete } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>Delete.component';
export { <%= entity.capitalize %>View } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>View.component';
export { <%= entity.capitalize %>List } from './<%= entity.uncapitalize %>/<%= entity.uncapitalize %>List.component';
<% })%>
