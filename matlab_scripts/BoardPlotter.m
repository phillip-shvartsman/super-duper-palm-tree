%% BoardPlotter
% Inputs board size, room verticies, provides visual plotting of the boards
classdef BoardPlotter
    properties
        verticies;
    end
    properties(Constant)
        x = 1;
        y = 2;
    end
    methods(Static, Access = public)
        %% Uses the room verticies to plot shape of room in graphic
        function displayRoom(verticies)
            x = 1; y = 2;
            topLeft =   [verticies(1).x, verticies(1).y];
            topRight =  [verticies(2).x, verticies(2).y];
            botRight =  [verticies(3).x, verticies(3).y];
            botLeft =   [verticies(4).x, verticies(4).y];

            clear figure 1;
            figure(1);
            hold all; grid on;
            lineThick = 3;
            % top
            plot([topLeft(x) topRight(x)], [topLeft(y) topRight(y)], 'k', 'LineWidth', lineThick) 
            % bot
            plot([botLeft(x) botRight(x)], [botLeft(y) botRight(y)], 'k', 'LineWidth', lineThick) 
            % left
            plot([topLeft(x) botLeft(x)], [topLeft(y) botLeft(y)], 'k', 'LineWidth', lineThick) 
            % right
            plot([topRight(x) botRight(x)], [topRight(y) botRight(y)], 'k', 'LineWidth', lineThick) 
        end
        
        function markObstructions()
        end
        function clearBoards()
        end
        function clearRoom()
            close figure 1;
            displayRoom();
        end
        function clearAllPlots()
        end
    end
    methods
        function obj = BoardPlotter(RoomVerticies)
            obj.verticies = RoomVerticies;            
        end
        
        %% Adds a board to the desired location
        % board location is top left X,Y of the boards
        function addBoard(obj, boardDim, boardLoc, varagin)
            x = 1; y = 2;
            bTopLeft  = [boardLoc(x),              boardLoc(y)];
            bTopRight = [bTopLeft(x)+boardDim(1),  boardLoc(y)];
            bBotRight = [bTopRight(x),             boardLoc(y)-boardDim(2)];
            bBotLeft  = [bBotRight(x)-boardDim(1), bBotRight(y)];

            % top 
            plot([bTopLeft(x), bTopRight(x)], [bTopLeft(y), bTopLeft(y)], 'b')
            % bottom
            plot([bBotLeft(x), bBotRight(x)], [bBotLeft(y), bBotRight(y)], 'b')
            % left
            plot([bTopLeft(x), bBotLeft(x)], [bTopLeft(y), bBotLeft(y)], 'b')
            % right
            plot([bTopRight(x), bBotRight(x)], [bBotRight(y), bTopRight(y)], 'b')
        end
    end
end

