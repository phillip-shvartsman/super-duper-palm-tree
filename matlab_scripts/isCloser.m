function point = isCloser( point1, x1, y1, x2, y2)
    % just returns the point that's closer to x1, y1 where point 2 is x2,
    % y2, uses pythagorean theorem to compare sizes
    if((x1-point1(1))^2+(y1-point1(2))^2 < (x2-point1(1))^2+(y2-point1(2))^2)
        point = point1;
    else
        point = [x2,y2];
    end

end

