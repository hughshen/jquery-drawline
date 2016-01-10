#jQuery Drawline

以两个DOM元素的中心为点画线，需要先导入jQuery文件。

#用法

```
$.drawline($('.outer'), $('.center'), {});
```

`$('.outer')`和`$('center')`是jQuery对象，其中线产生的位置在`$('.center')`的中心点，然后根据计算出的角度进行旋转，画出的线是`div`元素，并使用绝对定位。

#参数

* `lineWidth` - 线条宽度
* `lineClass` - 线条样式
* `lineColor` - 线条颜色
* `lineZIndex` - 元素`z-index`值

#说明

供个人学习用。