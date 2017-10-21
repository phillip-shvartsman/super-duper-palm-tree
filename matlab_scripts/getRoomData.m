% Uses example data to construct object containing room data
function output = getRoomData()
%% verticies
% 0:{x: 39, y: 85}
% 1:{x: 279, y: 85}
% 2:{x: 279, y: 285}
% 3:{x: 39, y: 285}
% 4:{x: 39, y: 85}
vertex.x = 39;   vertex.y = 85;
verticies(1) = vertex; 
vertex.x = 279;  vertex.y = 85;   
verticies(2) = vertex;
vertex.x = 279;  vertex.y = 285;
verticies(3) = vertex;
vertex.x = 39;   vertex.y = 285;
verticies(4) = vertex;
vertex.x = 39;   vertex.y = 85;
verticies(5) = vertex;

output = verticies;
clear vertex;clear verticies

end