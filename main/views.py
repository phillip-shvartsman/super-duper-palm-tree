# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
# Create your views here.

def index(request):
	context = {}
	return render(request,'main/index.html',context)
@csrf_exempt
def process(request):
	print request.POST.get('id')
	#return render(request,'main/index.html',context)
	return JsonResponse({'foo':'Hello!'});