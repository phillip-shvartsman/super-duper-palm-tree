function isInside = isInPolygon(x,y,A)
    
    %this function takes x and y coordinates and the set of vertices  of a
    %polygon (A) ordered in how they're connected it iterates over the
    %various vertices finding how many times it crosses the y axis of the
    %point above it

    numCrossings = 0;
    len = length(A);
    
    % Loop over each set of vertices 
    for i = 1:(len-1)
    
        p1x = A(i,1);
        p1y = A(i,2);
        p2x = A((i+1),1);
        p2y = A((i+1),2);
        
        % check if points are above the value
        p1xIsAbove = p1x > x;
        p2xIsAbove = p2x > x;
        % determine if there's been any flips in value for x
        xflip = xor(p1xIsAbove,p2xIsAbove);
        % If there was a flip determine where it crosses the point's y axis
        % and if that point is above the point.
        if(xflip)
            slope = (p2y-p1y)/(p2x-p1x);
            ycross = p1y + (slope*(x-p1x));
            if(ycross >= y)
                numCrossings = numCrossings + 1;
            end
        end
    end
    % Handle last transition back to first point
        p1x = A(len,1);
        p1y = A(len,2);
        p2x = A((1),1);
        p2y = A((1),2);
        
        % check if points are above the value
        p1xIsAbove = p1x > x;
        p2xIsAbove = p2x > x;
        % determine if there's been any flips in value for x
        xflip = xor(p1xIsAbove,p2xIsAbove);
        % If there was a flip determine where it crosses the point's y axis
        % and if that point is above the point.
        if(xflip)
            slope = (p2y-p1y)/(p2x-p1x);
            ycross = p1y + (slope*(x-p1x));
            if(ycross >= y)
                numCrossings = numCrossings + 1;
            end
        end
    
    
    
    isInside = numCrossings ~= 0;
    isInside = isInside && (boolean(mod(numCrossings,2)));
    
end

