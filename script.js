const allowedTags = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ];

const deleteEmptyTags = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'div',
  'table', 'thead', 'caption', 'tbody', 'pre' ];

const blockSelectTags = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'p' ];

new Vue({
  el: '#app',
  data () {
    return {
      input: '',
      selectedTag: 'h2',
      tags: blockSelectTags
    }
  },
  methods: {
    handlePaste (e) {
      if (e.clipboardData && e.clipboardData.getData) {
        let inputHtml = e.clipboardData.getData('text/html');

        //Start of paragraph2
        var text1 = '<div id="paragraph2-randomid" onmousedown="setLastFocusedDivId(this.id)" class="paragraph2-desc">';
        
        //End of paragraph2
        var text2 = '<button class="deleteDiv" onclick="deleteCurrentComponent(this)"></button></div>';  
     
        //start of Code Script Style4
        var text3 = text2 + '<div  id="codescript4-randomid" onmousedown="setLastFocusedDivId(this.id)" class="codescript4-desc">';
        //end of Code Script Style4
        var text4 = '<button class="copyDiv" onclick="copyCurrentComponent(this)">Copy</button><button class="deleteDiv" onclick="deleteCurrentComponent(this)"></button></div>' + text1;

        

        if (inputHtml) {
          e.preventDefault();
          e.stopPropagation();
          const bodyRegex = /<body>([\s\S]*)<\/body>/g;
          const matches = bodyRegex.exec(inputHtml);
          const bodyHtml = matches ? matches[1] : inputHtml;

          var newInput = text1.replace("randomid", this.getRndInt(100000,999999)) + this.sanitize(bodyHtml) + text2;

          newInput= this.replaceAllWithRandomId(newInput,'<pre><div>', text3 + '<div>');
          newInput = this.replaceAllWithRandomId(newInput, '</div></pre>', '</div></code></pre>' + text4 );



          newInput = this.replaceAll(newInput, 'Copy code</div>', '<div class="hideParentDiv"></div>Copy code</div><pre><code>');
          this.input = newInput;
          navigator.clipboard.writeText(newInput);

        }
      }
    },
    handleClick (e) {
      // let el = e.target;
      // let newChild = document.createElement(this.selectedTag);
      // var node = document.createTextNode(el.textContent);
      // newChild.appendChild(node);
      // el.parentElement.replaceChild(newChild, el);
      // let newHtml = this.$refs.preview.innerHTML;
      // this.input = this.sanitize(newHtml);
    },
    sanitize (html) {
      let sanitized = sanitizeHtml(html, {
        allowedTags: allowedTags
      });
      sanitized = sanitized
        // <br /><br /> -> </p><p>
        .replace(/<br \/>(\s)*(<br \/>)+/g, '</p><p>')
        // </p><br /> -> </p>
        .replace(/<p \/>(\s)*(<br \/>)+/g, '</p>')
        // <p><br /> -> </p>
        .replace(/<p>(\s)*(<br \/>)+/g, '<p>');
      // delete empty tags
      deleteEmptyTags.forEach(tag => {
        let regex = new RegExp(`<${tag}>(\\s)*</${tag}>`, 'g');
        sanitized = sanitized
          .replace(regex, '');
      })
      
      return sanitized;
    },

    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    },
    replaceAll(str, find, replace) {
      return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },
    // Not working as expected
    // replaceAllWithRandomIdRgx(str, find, replace) {
    //   return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace.replace("randomid", this.getRndInt(100000,999999)));
    // },
    replaceAllWithRandomId(inputString, oldStr, newStr)   {
      while (inputString.indexOf(oldStr) >= 0)
      {
          //inputString = inputString.replace(oldStr, newStr);
          updatedNewStr = newStr.replace("randomid", this.getRndInt(100000,999999));
          console.log(updatedNewStr);
          inputString = inputString.replace(oldStr, updatedNewStr);
      }

    return inputString;
    },
    getRndInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
  }
});

function replaceAllOL(){
  var newInput = document.getElementById("inputArea").value;
  newInput= replaceAll2(newInput,'<ol>', '<ul class = "unordered-list-arrow">');
  newInput= replaceAll2(newInput,'</ol>', '</ul>');
  document.getElementById("inputArea").value = newInput;
  navigator.clipboard.writeText(newInput);
}

function replaceAllLiP(){
  var newInput = document.getElementById("inputArea").value;
  newInput= replaceAll2(newInput,'<li><p>', '<li>');
  newInput= replaceAll2(newInput,'</p></li>', '</li>');
  document.getElementById("inputArea").value = newInput;
  navigator.clipboard.writeText(newInput);
}

function addBrWithAns(){
  var newInput = document.getElementById("inputArea").value;
  newInput= replaceAll2(newInput,'Answer:', '<br>Answer:');
  document.getElementById("inputArea").value = newInput;
  navigator.clipboard.writeText(newInput);
}

function addBrBtLI(){
  var newInput = document.getElementById("inputArea").value;
  newInput= replaceAll2(newInput,'</li><li>', '</li><br><li>');
  document.getElementById("inputArea").value = newInput;
  navigator.clipboard.writeText(newInput);
}

function multiPartRespUpd(){
  //Start of paragraph2
  var text1 = '<div id="paragraph2-randomid" onmousedown="setLastFocusedDivId(this.id)" class="paragraph2-desc">';

  //End of paragraph2
  var text2 = '<button class="deleteDiv" onclick="deleteCurrentComponent(this)"></button></div>';  

  var newInput = document.getElementById("inputArea").value;
  newInput= replaceAllWithRandomId2(newInput,'</div></div></div></div></div><div>', text2 + '</div></div></div></div></div>' + text1 + '<div>');
  document.getElementById("inputArea").value = newInput;
  navigator.clipboard.writeText(newInput);
}

function escapeRegExp2(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll2(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp2(find), 'g'), replace);
}

//Not working as expected
// function replaceAllWithRandomIdRgx2(str, find, replace) {
//   return str.replace(new RegExp(this.escapeRegExp2(find), 'g'), replace.replace("randomid", this.getRndInt2(100000,999999)));
// }

function replaceAllWithRandomId2(inputString, oldStr, newStr) 
{
    while (inputString.indexOf(oldStr) >= 0)
    {
        inputString = inputString.replace(oldStr, newStr.replace("randomid", getRndInt2(100000,999999)));
    }
    return inputString;
}

function getRndInt2(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
// String.prototype.replaceAll = function(search, replacement) {
//   var target = this;
//   return target.replace(new RegExp(search, 'g'), replacement);
// };