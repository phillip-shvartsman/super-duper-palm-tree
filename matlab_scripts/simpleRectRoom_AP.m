% Aaron Pycraft
% 10-21-2017
% deriving solution to board laying problems
clear; clc; close all;
%% Constants
x = 1;
y = 2;
%%

boardDim = [50, 15]; % ft
boardLoc = [39, 285];

bp = BoardPlotter(getRoomData);
bp.displayRoom(getRoomData);
bp.addBoard(boardDim, [boardLoc(1), boardLoc(2)]);
for i = 0:4
    for j=0:10
        bp.addBoard(boardDim,...
            [boardLoc(1)+i*boardDim(1), boardLoc(2) - j*boardDim(2)]);    
    end
end



