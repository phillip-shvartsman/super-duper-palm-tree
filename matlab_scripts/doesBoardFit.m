function [ doesFit, cutBoard ] = doesBoardFit(board, room )
% Returns a true/false (doesFit) and the board to be placed
    
    x = board.boardloc(1) + board.boardsize(1);
    y = board.boardloc(2);
    doesFit = isInPolygon(x,y,room);
    if(~doesFit)
        cutPosition = findPolygonIntersection(board.boardloc(1),board.boardloc(2),x,y,room);
        newLength = cutPosition(1) - board.boardloc(1);
        board.boardsize(1) = newLength;
    end
    cutBoard = board;
    
end

