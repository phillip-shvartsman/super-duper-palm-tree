# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
# Create your views here.

def index(request):
	context = {}
	return render(request,'main/index.html',context)
@csrf_exempt
def process(request):
	vertices = json.loads(request.POST['text']) #contains all the points .. access using data['0'] for first tuple .. data['0']['x'] for first
		#tuples x value .. sadly they must be index using strings :(
	boardsize = json.loads(request.POST['boardsize'])
	units = json.loads(request.POST['unit'])
	print len(data)
	#return render(request,'main/index.html',context)
	return JsonResponse({'foo':'Hello!'});