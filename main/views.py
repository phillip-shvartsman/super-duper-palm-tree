# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def index(request):
	context = {}
	return render(request,'main/index.html',context)
def process(request):
	return render(request,'main/index.html',context)