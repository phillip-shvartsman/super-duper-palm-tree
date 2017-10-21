function intersect = findPolygonIntersection(p0_x,p0_y,p1_x,p1_y,A)    
    %this function finds the intersection with the polygon (A) edges of the
    %line segment from p0 to p1,
    % should return a (-9999,-9999) point if none was found
    % If multiple intersections exist, it gives you the closest one to p0
    
    
    len = length(A);
    isFound = false;    
    
    intersect = [-9999,-9999]; % This is pretty lazy and a bad idea
    
    for i = 1:(len-1)
        
        p2_x = A(i,1);
        p2_y = A(i,2);
        p3_x = A((i+1),1);
        p3_y = A((i+1),2);
        
        % S values
        s1_x = p1_x - p0_x;
        s1_y = p1_y - p0_y;
        % R values
        s2_x = p3_x - p2_x;    
        s2_y = p3_y - p2_y;
        
        % This is S cross R
        temp = (-s2_x * s1_y + s1_x * s2_y); 
        if(temp == 0)
            % If crossproduct is zero, they are coolinear, ignore        
        else
            s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / temp;
            t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / temp;

            if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
                if(not(isFound))
                    isFound = true;
                    intersect = [p0_x + (t * s1_x),p0_y + (t * s1_y)];
                else
                    intersect = isCloser(intersect, p0_x,p0_y,p0_x + (t * s1_x),p0_y + (t * s1_y));
                end
            end

        end
    end
       
    
    % Deal with going from end of list to beginning
        p2_x = A(len,1);
        p2_y = A(len,2);
        p3_x = A((1),1);
        p3_y = A((1),2);
        
        % S values
        s1_x = p1_x - p0_x;
        s1_y = p1_y - p0_y;
        % R values
        s2_x = p3_x - p2_x;    
        s2_y = p3_y - p2_y;
        
        % This is S cross R
        temp = (-s2_x * s1_y + s1_x * s2_y); 
        if(temp == 0)
            % If crossproduct is zero, they are coolinear, ignore        
        else
            s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / temp;
            t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / temp;

            if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
                if(not(isFound))
                    isFound = true;
                    intersect = [p0_x + (t * s1_x),p0_y + (t * s1_y)];
                else
                    intersect = isCloser(intersect, p0_x,p0_y,p0_x + (t * s1_x),p0_y + (t * s1_y));
                end
            end

        end    
end
